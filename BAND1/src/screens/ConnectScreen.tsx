import React, {useState, useEffect} from 'react';
import {Linking, Text, View, Image, Alert} from 'react-native';
import styles from '../Styles';
import BigLogo from '../components/BigLogo';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import DisplayBox from '../components/DisplayBox';
import DeviceBox from '../components/DeviceBox';
import { connectDevice, disconnectDevice, startScan } from '../backend/BluetoothManager';
import { Peripheral } from 'react-native-ble-manager';

type DisplayBoxContentProps = {
  stepNumber: number;
  deviceList: Peripheral[] | null;
  selectedDevice: Peripheral;
  setSelectedDevice: any;
  setButtonText: any;
};

// temporary brute force rendering of box content change
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
            {deviceList ? 'Devices Found:' : 'No devices were found...'}
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
            Connected Device:
          </Text>
          <DeviceBox
            key={selectedDevice?.id}
            device={selectedDevice}
            iconSource={{
              uri: 'https://pngimg.com/d/wifi_PNG62360.png',
            }}
            onSelect={() => {
              console.log('Clicked');
            }}
            viewStyle={[
              styles.viewContainer,
              styles.leftAlignContainer,
              styles.iconTextBox,
              // styles.selectedIconTextBox,
            ]}
            iconStyle={(styles.image, styles.iconTextBoxImage)}
            textStyle={styles.deviceTitle}
            activeOpacity={1}
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
    startScan(() => {
      setIsLoading(true);
      setStepNumber(1);
    }, devices => {
      setIsLoading(false);
      nextStep();
      setButtonText(selectedDevice ? 'Connect Device' : 'Select Device');
      setDeviceList(Array.from(devices.values()));
    })
  };

  const mockConnection = async () => {
    setIsLoading(true);
    setStepNumber(3);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      nextStep();
      console.log(stepNumber + 1);
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
    })
  };

  const nextStep = () => {
    if (stepNumber < numberOfSteps) {
      stepNumber === 4 ? setButtonText('Continue') : null;
      setStepNumber(prev => prev + 1);
      console.log(stepNumber + 1);
      setButtonText(stepNumber === 2 ? 'Continue' : 'Connect Device');
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
        disconnectDevice();
        break;
    }
  };

  const initiateConnection = () => {
    if (stepNumber === 0) {
      // console.log('Mocking device search');
      // mockSearch();
      search();
    } else if (stepNumber === 2) {
      if (selectedDevice === null) {
        console.log('Please select a device');
        Alert.alert('No device selected', 'Please select a device');
        return;
      }
      // console.log('Mocking connection');
      // mockConnection();
      console.log("Connecting to " + selectedDevice?.name);
      connect();
    } else {
      nextStep();
    }
  };

  return (
    <View style={styles.screen}>
      <BigLogo name="MRBandage" slogan="Detect your infections early" />

      {/* add code to show display box here */}
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
        <ProgressBar
          numberOfPages={numberOfSteps}
          activePage={Math.round(stepNumber / 2.5)}
        />

        {stepNumber === 1 || stepNumber === 3 ? null : (
          <Button title={buttonText} onPress={initiateConnection} />
        )}
        {stepNumber > 1 && stepNumber !== 3 ? (
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
