import { EventEmitter } from 'node:events';

const THRESHOLD_TEMPERATURE_CHANGE = 2;
const THRESHOLD_PH = -1;  // temporary value needs to be changed

class UserData extends EventEmitter {
    private initialTemp: number;
    private averageTemp: number;
    private minTemp: number;
    private maxTemp: number;
    private numReadings: number;

    private currentpH: string;

    private infected: boolean;

    constructor(initialTemp: number) {
        super();
        this.infected = false;

        this.initialTemp = initialTemp;
        this.averageTemp = 0;
        this.minTemp = 0;
        this.maxTemp = 0;

        this.numReadings = 0;

        this.currentpH = "";
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
        const newAverage: number = ((this.averageTemp * this.numReadings) + temp) / ++this.numReadings;

        if (newAverage != this.averageTemp) {
            this.averageTemp = newAverage;
            this.emit('avgTempChange', this.averageTemp);
        }

        if (temp < this.minTemp) {
            this.minTemp = temp;
            this.emit('minTempChange', this.minTemp);
        }

        if (temp > this.maxTemp) {
            this.maxTemp = temp;
            this.emit('maxTempChange', this.maxTemp);
        }

        if ((temp - this.initialTemp) > THRESHOLD_TEMPERATURE_CHANGE) {
            this.emit('highTemp');
        }
    }

    /**
     * Process pH data and emit event if pH threshold reached
     * 
     * @emits highPH    if the pH colour value translates to a pH that is past the threshold value
     */
    public updatePH(pH: string) {
        this.currentpH = pH;

        if (this.pHValueFromColour(pH) > THRESHOLD_PH) {
            this.emit('highPH')
        }
    }

    private pHValueFromColour(colour: string) {
        return 0; // temporary
    }

}

export default UserData;
