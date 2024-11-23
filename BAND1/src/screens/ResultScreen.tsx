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
import PressableIcon from '../components/PressableIcon';
import {User} from '../backend/UserData';
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

  const POSTIVE_MESSAGE = "Elevated pH and temperature levels suggest possible infection.";
  const NEGATIVE_MESSAGE = "Wound is in good condition. Keep it clean and protected.";

  const [avgTemp, setAvgTemp] = useState(User.getAverageTemp());
  const [lowTemp, setLowTemp] = useState(User.getMinTemp());
  const [highTemp, setHighTemp] = useState(User.getMaxTemp());
  const [message, setMessage] = useState('Device Connected');
  const [result, setResult] = useState(false);

  useEffect(() => {
    let avgTempListener = User.addListener(User.avgTempChange, setAvgTemp);
    let maxTempListener = User.addListener(User.maxTempChange, setHighTemp);
    let minTempListener = User.addListener(User.minTempChange, setLowTemp);
    let infectionStatusListener = User.addListener(User.infectionStatusChange, setResult);
    let highTempListener = User.addListener(User.highTemp, () => {
      setMessage("Please Check pH");
    })

    return () => {
      avgTempListener.remove();
      maxTempListener.remove();
      minTempListener.remove();
      infectionStatusListener.remove();
      highTempListener.remove();
    }
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
        <Text style={{...styles.resultHeading, color: result ? colours.brandDarkRed : colours.textDarkBlue}}>
          {result ? "POSITIVE" : "NEGATIVE"} </Text>
        <Text style={{...styles.resultMessage, color: result ? colours.brandLightOrange : colours.brandPalePurple}}>
          {result ? POSTIVE_MESSAGE : NEGATIVE_MESSAGE} </Text>
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
          <View>
            <Text style={styles.boldText}>{'H:  ' + highTemp + '\u2103'}</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            <Text style={styles.boldText}>{'L:  ' + lowTemp + '\u2103'}</Text>
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
