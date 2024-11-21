import EventEmitter, { on } from 'events';
import { NativeModules } from 'react-native';
import BleManager from 'react-native-ble-manager';

const THERMOMETER_SERVICE: string = "1809";
const BATTERY_SERVICE: string = "180F";
const DEVICE_NAME: string = 'MRSensor';

const TIMEOUT = 5;  // 2 seconds less than the minimum time before user confusion in testing

const BleEventEmitter = new EventEmitter(NativeModules.BleManager);
const discoveredDevices: Map<string, any> = new Map();

const startScan = (onStart: () => void = () => {}, onComplete: (devices: Map<string, any>) => void = () => {}) => {
    BleManager.scan([THERMOMETER_SERVICE, BATTERY_SERVICE], TIMEOUT, true).then(() => {
        console.log("Starting scan");
        onStart();
    });

    BleEventEmitter.once('BleManagerStopScan', () => {
        onComplete(discoveredDevices);
    });
}

const connectDevice = (peripheralId: string, onConnect: () => void = () => {}) => {
    BleManager.connect(peripheralId).then(() => {
        console.log("Connected");
        onConnect();
    }).catch(error => {
        console.log("Error");
    })
}

BleEventEmitter.on('BleManagerDiscoverPeripheral', peripheral => {
    if (peripheral.name == DEVICE_NAME) {
        // only add if the discovered device is an MRSensor
        discoveredDevices.set(peripheral.id, peripheral);
        console.log("Device found: " + Array.from(peripheral.values()));
    }
});

BleEventEmitter.on('BleManagerStopScan', () => {
    console.log("Scan stopped, discovered devices: " + discoveredDevices);
});

BleManager.start({showAlert: true}).then(() => {
    console.log("Module mounted");
});

export {startScan, connectDevice};
