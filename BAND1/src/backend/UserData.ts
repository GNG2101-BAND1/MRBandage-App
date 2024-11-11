import { EventEmitter } from 'node:events';

const THRESHOLD_TEMPERATURE_CHANGE = 2;
const THRESHOLD_PH = -1;  // temporary value needs to be changed

class UserData {
    private initialTemp: number;
    private averageTemp: number;
    private minTemp: number;
    private maxTemp: number;
    private numReadings: number;

    private currentpH: string;

    private infected: boolean;

    private eventEmitter: EventEmitter;

    constructor(initialTemp: number) {
        this.infected = false;

        this.initialTemp = initialTemp;
        this.averageTemp = 0;
        this.minTemp = 0;
        this.maxTemp = 0;

        this.numReadings = 0;

        this.currentpH = "";

        this.eventEmitter = new EventEmitter();
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
            this.eventEmitter.emit('avgTempChange', this.averageTemp);
        }

        if (temp < this.minTemp) {
            this.minTemp = temp;
            this.eventEmitter.emit('minTempChange', this.minTemp);
        }

        if (temp > this.maxTemp) {
            this.maxTemp = temp;
            this.eventEmitter.emit('maxTempChange', this.maxTemp);
        }

        if ((temp - this.initialTemp) > THRESHOLD_TEMPERATURE_CHANGE) {
            this.eventEmitter.emit('highTemp');
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
            this.eventEmitter.emit('highPH')
        }
    }

    private pHValueFromColour(colour: string) {
        return 0; // temporary
    }

}
