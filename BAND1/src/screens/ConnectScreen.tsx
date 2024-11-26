import React, {useState, useEffect} from 'react';
import {Linking, Text, View, Image, Alert} from 'react-native';
import styles from '../Styles';
import BigLogo from '../components/BigLogo';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import DisplayBox from '../components/DisplayBox';
import DeviceBox from '../components/DeviceBox';
import {
  connectDevice,
  disconnectDevice,
  startScan,
} from '../backend/BluetoothManager';
import {Peripheral} from 'react-native-ble-manager';
import {generateTemperatures} from '../backend/MockDataGenerator';
import {images} from '../Values';

type DisplayBoxContentProps = {
  stepNumber: number;
  deviceList: Peripheral[] | null;
  selectedDevice: Peripheral;
  setSelectedDevice: any;
  setButtonText: any;
};

const DisplayBoxContent = ({
  stepNumber,
  deviceList = null,
  selectedDevice,
  setSelectedDevice,
  setButtonText,
}: DisplayBoxContentProps) => {
  switch (stepNumber) {
    case 1:
      return (
        <View>
          <Text style={styles.deviceListTitle}>Searching for device...</Text>
          <Image
            style={styles.loadingGIF}
            source={{
              uri: 'https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif',
            }}
          />
        </View>
      );
    case 2:
      return (
        <>
          <Text style={styles.deviceListTitle}>
            {deviceList && deviceList.length > 0
              ? 'Devices Found:'
              : 'No devices were found...'}
          </Text>

          {deviceList?.map(device => {
            return (
              <DeviceBox
                key={device?.id}
                device={device}
                iconSource={{
                  uri: 'https://pngimg.com/d/wifi_PNG62360.png',
                }}
                onSelect={(device: Peripheral) => {
                  console.log(device?.name + ' selected');
                  setSelectedDevice(device);
                  setButtonText('Connect Device');
                }}
                viewStyle={
                  selectedDevice === device
                    ? [
                        styles.viewContainer,
                        styles.leftAlignContainer,
                        styles.iconTextBox,
                        styles.selectedIconTextBox,
                      ]
                    : [
                        styles.viewContainer,
                        styles.leftAlignContainer,
                        styles.iconTextBox,
                      ]
                }
                iconStyle={(styles.image, styles.iconTextBoxImage)}
                textStyle={styles.deviceTitle}
                activeOpacity={0.6}
              />
            );
          })}
        </>
      );
    case 3:
      return (
        <View>
          <Text style={styles.deviceListTitle}>
            Connecting to {selectedDevice.name}...
          </Text>
          <Image
            style={styles.loadingGIF}
            source={{
              uri: 'https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif',
            }}
          />
        </View>
      );
    case 4:
      return (
        <View style={{padding: 10}}>
          <Text style={{marginBottom: 10, ...styles.boldText}}>
            Device calibration:
          </Text>
          <Text style={{marginBottom: 10, ...styles.text}}>
            Attach the device onto the skin surface to calibrate temperature
          </Text>
          <Image
            style={styles.attachmentImage}
            source={images.images.deviceAttachment}
          />
        </View>
      );
  }
};

const ConnectScreen = ({navigation}: any) => {
  const DEBUGGING_MOCK_LOAD_TIME = 3000;

  const numberOfSteps = 3;
  const [stepNumber, setStepNumber] = useState(0);
  const [buttonText, setButtonText] = useState('Connect Device');

  const [deviceList, setDeviceList] = useState(new Array());
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [calibration, setCalibration] = useState(''); // 10-second countdown

  useEffect(() => {
    console.log('ConnectScreen mounted');
    return () => {
      console.log('ConnectScreen unmounted');
    };
  }, []);

  const mockSearch = async () => {
    setIsLoading(true);
    setStepNumber(1);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      nextStep();
      setButtonText(selectedDevice ? 'Connect Device' : 'Select Device');
      setDeviceList(['Arduino cu.usbmodem13401', 'Arduino cu.usbmodem92012']);
    }, DEBUGGING_MOCK_LOAD_TIME);

    return () => clearTimeout(timeoutId);
  };

  const search = () => {
    startScan(
      () => {
        setIsLoading(true);
        setStepNumber(1);
      },
      devices => {
        setIsLoading(false);
        nextStep();
        setButtonText(selectedDevice ? 'Connect Device' : 'Select Device');
        setDeviceList(Array.from(devices.values()));
      },
    );
  };

  const mockConnection = async () => {
    setIsLoading(true);
    setStepNumber(3);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      nextStep();
      Alert.alert('Device Connected', selectedDevice, [
        {
          text: 'Continue',
          onPress: () => console.log('Continue'),
        },
      ]);
    }, DEBUGGING_MOCK_LOAD_TIME);

    return () => clearTimeout(timeoutId);
  };

  const connect = () => {
    setIsLoading(true);
    setStepNumber(3);
    connectDevice(selectedDevice?.id, () => {
      setIsLoading(false);
      nextStep();
      console.log(stepNumber + 1);
    });
  };

  const nextStep = () => {
    if (stepNumber < numberOfSteps) {
      setStepNumber(prev => prev + 1);
    } else {
      navigation.navigate('Result');
    }
  };

  const previousStep = () => {
    switch (stepNumber) {
      case 2:
        setStepNumber(0);
        setSelectedDevice(null);
        setButtonText('Connect Device');
        disconnectDevice();
        break;
      case 4:
        setStepNumber(2);
        setSelectedDevice(null);
        setButtonText('Select Device');
        setCalibration(''); // reset calibration
        disconnectDevice();
        break;
    }
  };

  const initiateConnection = () => {
    if (stepNumber === 0) {
      console.log('Mocking device search');
      mockSearch();
      // search();
    } else if (stepNumber === 2) {
      if (selectedDevice === null) {
        console.log('Please select a device');
        Alert.alert('No device selected', 'Please select a device');
        return;
      }
      console.log('Mocking connection');
      mockConnection();
      generateTemperatures();
      setButtonText('Start Calibration');
      // console.log('Connecting to ' + selectedDevice?.name);
      // connect();
    } else if (stepNumber === 4 && calibration === '') {
      startCalibration();
    } else {
      nextStep();
    }
  };
  const startCalibration = () => {
    // currently mocking calibration for 10seconds
    let timer = 10;
    let dotCount = 0; // To cycle through the dots
    setButtonText('Calibrating');

    const intervalId = setInterval(() => {
      // Update the loading dots
      dotCount = (dotCount + 1) % 4; // Cycle through 0, 1, 2, 3
      const dots = '.'.repeat(dotCount); // Generate dots based on dotCount
      setButtonText(`Calibration in process${dots}`);

      timer -= 1;
      setCalibration('Calibrating');
      if (timer === 0) {
        setCalibration('Calibrated');
        clearInterval(intervalId);
        Alert.alert('Calibration Complete', 'The device is ready for use.');
        setButtonText('Continue');
      }
    }, 1000);
  };

  return (
    <View style={styles.screen}>
      <BigLogo name="MRBandage" slogan="Detect your infections early" />
      <DisplayBox visible={stepNumber > 0 || isLoading}>
        <DisplayBoxContent
          stepNumber={stepNumber}
          deviceList={deviceList}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          setButtonText={setButtonText}
        />
      </DisplayBox>

      <View
        style={[
          styles.sectionContainer,
          styles.centerAlignContainer,
          styles.bottomAlignContainer,
        ]}>
        {stepNumber === 4 && calibration === 'Calibrating' ? (
          <Text style={[styles.boldText, styles.calibrationText]}>
            {buttonText}
          </Text>
        ) : (
          <ProgressBar
            numberOfPages={numberOfSteps}
            activePage={Math.round(stepNumber / 2.5)}
          />
        )}

        {stepNumber === 1 ||
        stepNumber === 3 ||
        calibration === 'Calibrating' ? null : (
          <Button title={buttonText} onPress={initiateConnection} />
        )}
        {stepNumber > 1 && stepNumber !== 3 && calibration !== 'Calibrating' ? (
          <Button
            title="Back"
            onPress={previousStep}
            buttonStyle={styles.backBtn}
            buttonTextStyle={styles.backBtnText}
          />
        ) : null}

        <View style={styles.horizontalSameLine}>
          <Text style={styles.caption}>Have a problem? See our </Text>
          <Text
            style={[styles.caption, styles.hyperlink]}
            onPress={() => {
              Linking.openURL(
                'https://github.com/GNG2101-BAND1/BAND1-app',
              ); /*Temp link to repo*/
            }}>
            FAQ page
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConnectScreen;
