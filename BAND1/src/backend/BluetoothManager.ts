import BleManager, {Peripheral, PeripheralInfo} from 'react-native-ble-manager';
import {
  checkMultiple,
  PERMISSIONS,
  request,
  Permission,
  RESULTS,
} from 'react-native-permissions';
import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';
import {Buffer} from 'react-native-buffer';
import {User} from './UserData';

const requiredPermissions: Permission[] =
  Platform.OS === 'android'
    ? [
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      ]
    : [PERMISSIONS.IOS.BLUETOOTH];

const THERMOMETER_SERVICE: string = '1809';
const BATTERY_SERVICE: string = '180F';
const TEMPERATURE_CHARACTERISTIC: string = '2A1C';
const BATTERY_CHARACTERISTIC: string = '2A19';

const DEVICE_NAME: string = 'MRSensor';

const TIMEOUT = 5; // 2 seconds less than the minimum time before user confusion in testing

const BleEventEmitter = new NativeEventEmitter(NativeModules.BleManager);
const discoveredDevices: Map<string, any> = new Map();

let connectedDevice: string = '';
let canStart = false;
let espListener: EmitterSubscription | undefined;

const startScan = (
  onStart: () => void = () => {},
  onComplete: (devices: Map<string, any>) => void = () => {},
) => {
  // reset state
  discoveredDevices.clear();
  BleEventEmitter.removeAllListeners('BleManagerStopScan');

  BleManager.scan([THERMOMETER_SERVICE, BATTERY_SERVICE], TIMEOUT, true).then(
    () => {
      console.log('Starting scan');
      onStart();
    },
  );

  BleEventEmitter.addListener('BleManagerStopScan', () => {
    console.log(
      'Scan stopped, discovered devices: ' +
        Array.from(discoveredDevices.values()),
    );
    onComplete(discoveredDevices);
  });
};

const connectDevice = (
  peripheralId: string,
  onConnect: () => void = () => {},
) => {
  BleManager.connect(peripheralId)
    .then(() => {
      console.log('Connected');
      handleConnection(peripheralId);
      onConnect();
    })
    .catch(error => {
      console.log('Error');
    });
};

const handleConnection = (peripheralId: string) => {
  connectedDevice = peripheralId;
  BleManager.retrieveServices(peripheralId).then((info: PeripheralInfo) => {
    console.log('info: ' + info);
    BleManager.startNotification(
      connectedDevice,
      BATTERY_SERVICE,
      BATTERY_CHARACTERISTIC,
    ).then(() => {
      console.log('Started notification on battery');
    });
    BleManager.startNotification(
      connectedDevice,
      THERMOMETER_SERVICE,
      TEMPERATURE_CHARACTERISTIC,
    ).then(() => {
      console.log('Started notification on temperature');
    });
  });
};

const disconnectDevice = (onDisconnect: () => void = () => {}) => {
  handleDisconnection();
  if (connectedDevice) {
    BleManager.disconnect(connectedDevice)
      .then(() => {
        console.log('disconnected');
        connectedDevice = '';
        onDisconnect();
      })
      .catch(reason => {
        console.error('disconnect failed: ' + reason);
      });
  }
};

const handleDisconnection = () => {
  BleManager.stopNotification(
    connectedDevice,
    THERMOMETER_SERVICE,
    TEMPERATURE_CHARACTERISTIC,
  ).then(() => {
    console.log('notification stopped for temperature');
  });
  BleManager.stopNotification(
    connectedDevice,
    BATTERY_SERVICE,
    BATTERY_CHARACTERISTIC,
  ).then(() => {
    console.log('notifcation stopped for battery');
  });
};

/**
 * Start recording the next two temperature values sent and calibrate the user object with the average
 */
const startCalibration = () => {
  let prev: number | undefined;
  User.reset();

  return new Promise<void>((resolve, reject) => {
    let listener = BleEventEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      ({value, peripheral, characteristic, service}) => {
        const data = Buffer.from(value).readInt16LE(0) / 100;
        console.log(`Received ${data} for characteristic ${characteristic}`);

        if (characteristic.toUpperCase() === TEMPERATURE_CHARACTERISTIC) {
          if (prev) {
            if (checkTemperature(data)) {
              User.calibrate((prev + data) / 2);
              console.debug('calibrated temp: ' + (prev + data) / 2);
              canStart = true;
              listener.remove();
              resolve();
            }
          } else {
            if (checkTemperature(data)) {
              prev = data;
            }
          }
        }
      },
    );
  });
};

/**
 * Begin sending data to the user object
 *
 * Start calibration must be called before start can be called.
 */
const start = () => {
  if (!canStart) {
    throw new Error(
      'Start calibration must be called before start can be called.',
    );
  }

  espListener = BleEventEmitter.addListener(
    'BleManagerDidUpdateValueForCharacteristic',
    ({value, peripheral, characteristic, service}) => {
      const data = Buffer.from(value).readInt16LE(0) / 100;
      console.log(`Received ${data} for characteristic ${characteristic}`);

      if (characteristic.toUpperCase() === TEMPERATURE_CHARACTERISTIC) {
        if (checkTemperature(data)) {
          User.updateTemp(data);
        }
      } else if (characteristic.toUpperCase() === BATTERY_CHARACTERISTIC) {
        console.log(`Battery: ${data}`);
        if (checkBattery(data)) {
          User.updateBattery(data);
        }
      }
    },
  );
};

const stop = () => {
  if (espListener != undefined) {
    espListener.remove();
  }
};

const checkTemperature = (temperature: number) => {
  return temperature > 10 && temperature < 50; // discard any potentially erroneous values sent by esp
};

const checkBattery = (battery: number) => {
  return battery > 0 && battery < 100;
};

BleEventEmitter.addListener(
  'BleManagerDiscoverPeripheral',
  (peripheral: Peripheral) => {
    if (peripheral.name == DEVICE_NAME) {
      // only add if the discovered device is an MRSensor
      discoveredDevices.set(peripheral.id, peripheral);
      console.log('Device found: ' + peripheral.name);
    }
  },
);

// need to do more with the permissions if not accepted
checkMultiple(requiredPermissions).then(statuses => {
  requiredPermissions.forEach(permission => {
    if (statuses[permission] === RESULTS.DENIED) {
      request(permission).then(status => {
        console.log(
          'permission ' + permission + status ? ' granted' : ' denied',
        );
      });
    }
  });
});

BleManager.start({showAlert: true}).then(() => {
  console.log('Module mounted');
});

BleManager.enableBluetooth()
  .then(() => {
    console.log('Bluetooth enabled');
  })
  .catch(() => {
    console.log('Bluetooth refused');
  });

export {
  startScan,
  connectDevice,
  disconnectDevice,
  startCalibration,
  start,
  stop,
};
