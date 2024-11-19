import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../Styles';
import SmallLogo from '../components/SmallLogo';
import ProgressBar from '../components/ProgressBar';
import PressableIconTextBox from '../components/PressableIconTextBox';
import DisplayBox from '../components/DisplayBox';
import {images} from '../Values';
import HorizontalTextIconRow from '../components/HorizontalTextIconRow';
import ColouredCircle from '../components/ColouredCircle';
import {Image as SvgImage} from 'react-native-svg';
import PressableIcon from '../components/PressableIcon';
import UserData from '../backend/UserData';
// import { useRoute } from '@react-navigation/native';
import {colours} from '../Values';

type SectionProps = PropsWithChildren<{
  iconSource: any;
  sectionTitle: string;
}>;

type MessageProps = {
  message: string;
};

const ResultSection = ({children, iconSource, sectionTitle}: SectionProps) => {
  return (
    <View style={[styles.sectionContainer]}>
      <PressableIconTextBox
        iconSource={iconSource}
        text={sectionTitle}
        onPress={undefined}
        viewStyle={{
          ...styles.viewContainer,
          ...styles.resultTitleView,
        }}
        iconStyle={styles.image}
        textStyle={styles.heading}
      />
      <DisplayBox
        visible={true}
        viewStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        {children}
      </DisplayBox>
    </View>
  );
};

const InfoBox = ({message}: MessageProps) => {
  return <Text style={styles.appSlogan}>{message}</Text>;
};

const ResultScreen = ({navigation}: any) => {

  const [avgTemp, setAvgTemp] = useState(NaN);
  const [lowTemp, setLowTemp] = useState(NaN);
  const [highTemp, setHighTemp] = useState(NaN);
  const [message, setMessage] = useState('Device Connected');
  const [result, setResult] = useState("Calculating...");

  useEffect(() => {
    const initialTemp = 27;  // temporary hard coding temperature
    const User = new UserData(initialTemp);

    User.on(User.avgTempChange, setAvgTemp);
    User.on(User.maxTempChange, setHighTemp);
    User.on(User.minTempChange, setLowTemp);
  })

  return (
    <View style={styles.screen}>
      <View style={[styles.sectionContainer, styles.spacedEvenlyContainer]}>
        <SmallLogo name={'MRBandage'} />

        <View
          style={[
            styles.sectionContainer,
            styles.centerAlignContainer,
            styles.bottomAlignContainer,
          ]}>
          <InfoBox message={message} />
          <ProgressBar numberOfPages={3} activePage={-1} />
        </View>
      </View>

      <ResultSection iconSource={images.icons.heart} sectionTitle="Result">
        <Text style={styles.resultMessage}>{result}</Text>
      </ResultSection>
      <ResultSection
        iconSource={images.icons.thermometer}
        sectionTitle="Temperature">
        <View style={styles.temperatureContent}>
          <View style={styles.avgTemp}>
            <Text style={{...styles.boldText, fontSize: 40}}>{avgTemp + '\u2103'}</Text>
            <Text
              style={{
                ...styles.boldText,
                color: colours.brandPalePurple,
                textAlign: 'center',
              }}>
              Average
            </Text>
          </View>
          <View styles={styles.hlTemp}>
            <Text style={styles.boldText}>{'H:  ' + highTemp + '\u2103'}</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            <Text style={styles.boldText}>{'L:  ' + lowTemp + '--\u2103'}</Text>
          </View>
        </View>
      </ResultSection>
      <ResultSection iconSource={images.icons.drop} sectionTitle="pH Level">
        <HorizontalTextIconRow
          textStyle={styles.boldText}
          text="Current pH color:">
          <PressableIcon
            onPress={() => {
              console.log('icon clicked');
            }}>
            <Image style={styles.image} source={images.icons.camera} />
          </PressableIcon>
          <PressableIcon
            onPress={() => {
              console.log('icon clicked');
            }}>
            <Image style={styles.image} source={images.icons.arrow} />
          </PressableIcon>
          <PressableIcon
            onPress={() => {
              console.log('icon clicked');
            }}>
            <View style={styles.image}>
              <ColouredCircle colour="white" />
            </View>
          </PressableIcon>
        </HorizontalTextIconRow>
      </ResultSection>
    </View>
  );
};

export default ResultScreen;
