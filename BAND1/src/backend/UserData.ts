import { NativeEventEmitter } from "react-native";

const THRESHOLD_TEMPERATURE_CHANGE = 2;
const THRESHOLD_PH = -1;  // temporary value needs to be changed

const NUMBER_DATA_POINTS = (60 / 5) * 10;  // keep shifted average of last 10mins of data

class UserData extends NativeEventEmitter {

    public infectionDetected: string = 'infectionDetected';
    public avgTempChange: string = 'avgTempChange';
    public minTempChange: string = 'minTempChange';
    public maxTempChange: string = 'maxTempChange';
    public highTemp: string = 'highTemp';
    public highPH: string = 'highPH';

    private initialTemp: number | undefined;
    private temps: number[];
    private averageTemp: number;
    private minTemp: number;
    private maxTemp: number;

    private currentpH: number | undefined;

    constructor() {
        super();

        this.temps = new Array(NUMBER_DATA_POINTS);  
        this.minTemp = 0;
        this.maxTemp = 0;
        this.averageTemp = 0;
    }

    /**
     * Process temperature data and emit events if temperature values change.
     * 
     * @emits avgTempChange(averageTemp)    if the average changes
     * @emits minTempChange(minTemp)        if the temp value is less than the current minimum
     * @emits maxTempChange(maxTemp)        if the temp value is greater than the current maximum
     * @emits highTemp                      if the difference between the initial value and the current value exceeds the threshold
     */
    public updateTemp(temp: number) {
        if (this.initialTemp === undefined) {
            throw new Error('call calibrate before calling update methods');
        }

        if (this.temps.length === NUMBER_DATA_POINTS) {
            this.temps.shift();
        }

        this.temps.push();

        const newAverage = (this.temps.reduce((prev: number, current: number) => {
            return prev + current;
        })) / this.temps.length;

        if (newAverage != this.averageTemp) {
            this.averageTemp = newAverage;
            this.emit(this.avgTempChange, this.averageTemp);
        }

        if (temp < this.minTemp) {
            this.minTemp = temp;
            this.emit(this.minTempChange, this.minTemp);
        }

        if (temp > this.maxTemp) {
            this.maxTemp = temp;
            this.emit(this.maxTempChange, this.maxTemp);
        }

        if ((this.averageTemp - this.initialTemp) > THRESHOLD_TEMPERATURE_CHANGE) {
            this.emit(this.highTemp);

            if (this.currentpH && this.currentpH > THRESHOLD_PH) {
                this.emit(this.highPH);
                this.emit(this.infectionDetected);
            }
        }
    }

    /**
     * Process pH data and emit event if pH threshold reached
     * 
     * @emits highPH    if the pH colour value translates to a pH that is past the threshold value
     */
    public updatePH(pH: number) {
        if (this.initialTemp === undefined) {
            throw new Error('call calibrate before calling update methods');
        }

        this.currentpH = pH;

        if (pH > THRESHOLD_PH) {
            this.emit(this.highPH);

            if ((this.averageTemp - this.initialTemp) > THRESHOLD_TEMPERATURE_CHANGE) {
                this.emit(this.highTemp);
                this.emit(this.infectionDetected);
            }
        }
    }

}

export const User = new UserData();
