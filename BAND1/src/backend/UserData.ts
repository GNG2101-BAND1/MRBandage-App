import { NativeEventEmitter } from "react-native";

const THRESHOLD_TEMPERATURE_CHANGE = 2;
const THRESHOLD_PH = -1;  // temporary value needs to be changed

const NUMBER_DATA_POINTS = (60 / 5) * 10;  // keep shifted average of last 10mins of data

class UserData extends NativeEventEmitter {

    public infectionStatusChange: string = 'infectionStatusChange';
    public avgTempChange: string = 'avgTempChange';
    public minTempChange: string = 'minTempChange';
    public maxTempChange: string = 'maxTempChange';
    public highTemp: string = 'highTemp';
    public highPH: string = 'highPH';

    private initialTemp: number | undefined;
    private temps: number[];
    private averageTemp: number | undefined;
    private minTemp: number | undefined;
    private maxTemp: number | undefined;
    private infected: boolean;

    private currentpH: number | undefined;

    constructor() {
        super();

        this.temps = new Array();  

        this.infected = false;
    }

    /**
     * Calibrate the user data class so that offset calculation will function properly.  
     * Must be called once before any other method, and once for ever call to reset()
     * 
     * @param initialTemp the calibrated temperature of an unaffected area
     */
    public calibrate(initialTemp: number) {
        this.initialTemp = initialTemp;
    }

    /**
     * Clear all state in the user data set, including the calibration.
     */
    public reset() {
        this.initialTemp = undefined;
        this.currentpH = undefined;

        this.temps = new Array();

        this.infected = false;
    }

    /**
     * Process temperature data and emit events if temperature values change.
     * 
     * @emits avgTempChange(averageTemp)    if the average changes
     * @emits minTempChange(minTemp)        if the temp value is less than the current minimum
     * @emits maxTempChange(maxTemp)        if the temp value is greater than the current maximum
     * @emits highTemp                      if the difference between the initial value and the current value exceeds the threshold
     * @emits infectionStatusChange(infected)   if the infection status changes
     */
    public updateTemp(temp: number) {
        this.assertCalibrateCalled();

        if (this.temps.length === NUMBER_DATA_POINTS) {
            this.temps.shift();
        }

        this.temps.push(temp);

        const newAverage = Math.round(10 * (this.temps.reduce((prev: number, current: number) => {
            return prev + current;
        }, 0)) / this.temps.length) / 10;

        console.debug(`average: ${newAverage}`)

        if (newAverage != this.averageTemp) {
            this.averageTemp = newAverage;
            console.debug(`setting average`);
            this.emit(this.avgTempChange, this.averageTemp);
        }

        if (!this.minTemp || temp < this.minTemp) {
            this.minTemp = temp;
            console.debug(`setting min`);
            this.emit(this.minTempChange, this.minTemp);
        }

        if (!this.maxTemp || temp > this.maxTemp) {
            this.maxTemp = temp;
            console.debug(`setting max`);
            this.emit(this.maxTempChange, this.maxTemp);
        }

        if (this.checkTemp()) {
            this.emit(this.highTemp);

            if (!this.infected && this.checkPH()) {
                this.emit(this.highPH);
                this.emit(this.infectionStatusChange, true);
            }
        } else if (this.infected) {
            this.emit(this.infectionStatusChange, false);
        }
    }

    /**
     * Process pH data and emit event if pH threshold reached
     * 
     * @emits highPH    if the pH colour value translates to a pH that is past the threshold value
     * @emits infectionStatusChange(infected)   if the infection status changes
     */
    public updatePH(pH: number) {
        this.assertCalibrateCalled();

        this.currentpH = pH;

        if (this.checkPH()) {
            this.emit(this.highPH);

            if (!this.infected && this.checkTemp()) {
                this.emit(this.highTemp);
                this.emit(this.infectionStatusChange, true);
            }
        } else if (this.infected) {
            this.emit(this.infectionStatusChange, false);
        }
    }

    /**
     * Check the current state of the user's temperature data based on the calibrated initial and running sum
     * 
     * @returns true if the temperature is a cause for concern
     */
    public checkTemp() {
        this.assertCalibrateCalled();

        return (this.averageTemp - this.initialTemp) > THRESHOLD_TEMPERATURE_CHANGE;
    }

    /**
     * Check the current state of the user's pH
     * 
     * @returns true if the pH is a cause for concern
     */
    public checkPH() {
        return this.currentpH && this.currentpH > THRESHOLD_PH;
    }

    /**
     * Check the current state of the user
     * 
     * @returns true if the temperature and pH both indicate infection
     */
    public checkInfected() {
        return this.infected;
    }

    public getAverageTemp() {
        return this.averageTemp;
    }

    public getMinTemp() {
        return this.minTemp;
    }

    public getMaxTemp() {
        return this.maxTemp;
    }

    private assertCalibrateCalled() {
        if (this.initialTemp === undefined) {
            throw new Error('call calibrate before calling update methods');
        }
    }

}

export const User = new UserData();
