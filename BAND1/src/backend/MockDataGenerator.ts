import { User } from "./UserData";

const testValues: number[] = [25, 23, 21, 19, 27, 38, 12];

User.calibrate(23.4);

const generateTemperatures = async () => {
    for (const value of testValues) {
        console.log(`Generated value: ${value}`);
        User.updateTemp(value);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    }
};

export {generateTemperatures};
