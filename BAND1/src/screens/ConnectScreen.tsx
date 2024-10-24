import React, {useState, useEffect} from 'react';
import {Linking, Text, View, Image} from 'react-native';
import styles from '../Styles';
import BigLogo from '../components/BigLogo';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import DisplayBox from '../components/DisplayBox';
import HorizontalTextIconRow from '../components/HorizontalTextIconRow';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Connect: undefined,
  Result: undefined,
}

const ConnectScreen = ({navigation}: any) => {
  const numberOfSteps = 3;
  const [stepNumber, setStepNumber] = useState(0);
  const [buttonText, setButtonText] = useState('Connect Device');

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log('ConnectScreen mounted');

    return () => {
      console.log('ConnectScreen unmounted');
    };
  }, []);

  // Mock connection function to simulate device connection
  const mockConnection = async () => {
    setLoading(true); // Start loading
    const timeoutId = setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
      setStepNumber(prevStep => prevStep + 2);
      setButtonText('Select Device');
      console.log(stepNumber + 2);
    }, 3000);

    // Clean up timeout when component unmounts
    return () => clearTimeout(timeoutId);
  };

  return (
    <View style={styles.screen}>
      <BigLogo name="SmartBandaid" slogan="Detect your infections early" />

      {/* add code to show display box here */}
      <DisplayBox visible={loading || stepNumber > 1}>
        {loading ? (
          <View>
            <Text style={styles.text}>Searching for device...</Text>
            <Image
              style={styles.loadingGIF}
              source={{
                uri: 'https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif',
              }}
            />
          </View>
        ) : null}
      </DisplayBox>

      <View style={[styles.sectionContainer, styles.centerAlignContainer, styles.bottomAlignContainer]}>
        <ProgressBar
          numberOfPages={numberOfSteps}
          activePage={Math.floor(stepNumber / 2)}
        />
        {loading ? null : (
          <Button
            title={buttonText}
            onPress={() => {
              if (!(stepNumber === 5)) {
                switch (stepNumber + 1) {
                  case 3:
                    setButtonText('Connect Device');
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
