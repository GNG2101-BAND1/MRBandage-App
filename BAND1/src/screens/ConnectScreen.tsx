import React, {useState, useEffect} from 'react';
import {Linking, Text, View, Image} from 'react-native';
import styles from '../Styles';
import BigLogo from '../components/BigLogo';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import DisplayBox from '../components/DisplayBox';
import HorizontalTextIconRow from '../components/HorizontalTextIconRow';
import PressableIcon from '../components/PressableIcon';
import {images} from '../Values';
import ColouredCircle from '../components/ColouredCircle';
import DeviceBox from '../components/DeviceBox';

type DisplayBoxContentProps = {
  stepNumber: number;
  deviceList: string[] | null;
  selectedDevice: string;
  setSelectedDevice: any;
};

// temporary brute force rendering of box content change
const DisplayBoxContent = ({
  stepNumber,
  deviceList = null,
  selectedDevice,
  setSelectedDevice,
}: DisplayBoxContentProps) => {
  //   const [selectedDevice, setSelectedDevice] = useState('');
  switch (stepNumber) {
    case 1:
      return (
        <View>
          <Text style={styles.text}>Searching for device...</Text>
          <Image
            style={styles.loadingGIF}
            source={{
              uri: 'https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif',
            }}
          />
        </View>
      );
    case 2:
    // fall through to 3
    case 3:
      return (
        <>
          <Text style={styles.text}>
            {!deviceList ? 'Devices Found:' : 'No devices were found...'}
          </Text>

          {deviceList?.map(device => {
            return (
              <DeviceBox
                key={device}
                deviceName={device}
                iconSource={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Arduino_Uno_-_R3.jpg/440px-Arduino_Uno_-_R3.jpg',
                }}
                onSelect={device => {
                  console.log(device + ' selected');
                  setSelectedDevice(device);
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
              />
            );
          })}
        </>
      );
    case 4:
    // fall through to 5
    case 5:
      return (
        <View>
          <Text style={styles.text}>
            Please indicate the current colour of pH
          </Text>
          <HorizontalTextIconRow text="Current pH color:">
            <PressableIcon
              onPress={() => {
                console.log('iconPressed');
              }}>
              <Image style={styles.image} source={images.icons.arrow} />
            </PressableIcon>
            <PressableIcon
              onPress={() => {
                console.log('iconPressed');
              }}>
              <View style={styles.image}>
                <ColouredCircle colour="green" />
              </View>
            </PressableIcon>
          </HorizontalTextIconRow>
          <Text style={styles.text}>OR</Text>
          <HorizontalTextIconRow text={'Take a picture\nof the pH color:'}>
            <PressableIcon
              onPress={() => {
                console.log('iconPressed');
              }}>
              <Image style={styles.image} source={images.icons.camera} />
            </PressableIcon>
          </HorizontalTextIconRow>
        </View>
      );
  }
};

const ConnectScreen = ({navigation}: any) => {
  const DEBUGGING_MOCK_LOAD_TIME = 3000;

  const numberOfSteps = 3;
  const [stepNumber, setStepNumber] = useState(0);
  const [buttonText, setButtonText] = useState('Connect Device');

  const [deviceList, setDeviceList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');

  useEffect(() => {
    console.log('ConnectScreen mounted');
    return () => {
      console.log('ConnectScreen unmounted');
    };
  }, []);

  // Mock connection function to simulate device connection
  const mockConnection = async () => {
    setStepNumber(1); // Start loading
    const timeoutId = setTimeout(() => {
      setStepNumber(prevStep => prevStep + 1);
      setButtonText('Select Device');
      setDeviceList(['Arduino cu.usbmodem13401', 'Arduino cu.usbmodem92012']);
      console.log(stepNumber + 1);
    }, DEBUGGING_MOCK_LOAD_TIME);

    // Clean up timeout when component unmounts
    return () => clearTimeout(timeoutId);
  };

  return (
    <View style={styles.screen}>
      <BigLogo name="MRBandage" slogan="Detect your infections early" />

      {/* add code to show display box here */}
      <DisplayBox visible={stepNumber > 0}>
        <DisplayBoxContent
          stepNumber={stepNumber}
          deviceList={deviceList}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
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
          activePage={Math.floor(stepNumber / 2)}
        />
        {stepNumber === 1 ? null : (
          <Button
            title={buttonText}
            onPress={() => {
              if (!(stepNumber === 5)) {
                switch (stepNumber + 1) {
                  case 3:
                    if (selectedDevice === '') {
                      console.log('Please select a device');
                      return;
                    }
                    setButtonText('Connect Device');
                    setDeviceList([selectedDevice]);
                    break;
                  case 4:
                    setButtonText('Continue');
                    break;
                }
                if (stepNumber === 0) {
                  mockConnection(); // Start the connection simulation
                } else {
                  setStepNumber(prevStep => prevStep + 1); // Increment step if not connecting
                  console.log(stepNumber + 1);
                }
              } else {
                navigation.navigate('Result');
              }
            }}
          />
        )}

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
