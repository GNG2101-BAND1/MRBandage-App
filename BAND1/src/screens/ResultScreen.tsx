import React, {PropsWithChildren, useState} from 'react';
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
import DeviceClient from '../backend/DeviceClient';
// import { useRoute } from '@react-navigation/native';

type SectionProps = PropsWithChildren<{
  iconSource: any;
  sectionTitle: string;
}>;

type MessageProps = {
  message: string;
};

const ResultSection = ({children, iconSource, sectionTitle}: SectionProps) => {
  return (
    <View style={[styles.sectionContainer, styles.spacedEvenlyContainer]}>
      <PressableIconTextBox
        iconSource={iconSource}
        text={sectionTitle}
        onPress={undefined}
        viewStyle={[styles.viewContainer, styles.leftAlignContainer]}
        iconStyle={styles.image}
        textStyle={styles.heading}
      />
      <DisplayBox visible={true}>{children}</DisplayBox>
    </View>
  );
};

const InfoBox = ({message}: MessageProps) => {
  return <Text style={styles.appSlogan}>{message}</Text>;
};

const ResultScreen = ({navigation}: any) => {
  // const route = useRoute();

  const PORT = 12345;  // this should match the port number on the ESP
  const ADDRESS = '10.0.2.2';  // this should match the localIP of the ESP

  const client = new DeviceClient(PORT, ADDRESS);

  if (!client.connected()) {
    client.connect();
  }

  client.send('ping');

  const initialTemp = 27;  // temporary hard coding temperature
  const User = new UserData(initialTemp);

  const [avgTemp, setAvgTemp] = useState(0);

  User.on(User.avgTempChange, (temp: number) => {setAvgTemp(temp)});

  const [message, setMessage] = useState('Device Connected');

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
        <Text style={styles.text}>Calculating...</Text>
      </ResultSection>
      <ResultSection
        iconSource={images.icons.thermometer}
        sectionTitle="Temperature">
        <Text style={styles.text}>{'Average: ' + avgTemp + '\u2103'}</Text>
        <Text style={styles.text}>{'High: --\u2103'}</Text>
        <Text style={styles.text}>{'Low: --\u2103'}</Text>
      </ResultSection>
      <ResultSection iconSource={images.icons.drop} sectionTitle="pH Level">
        <HorizontalTextIconRow text="Initial pH color:">
          <PressableIcon
            onPress={() => {
              console.log('icon clicked');
            }}>
            <View style={styles.image}>
              <ColouredCircle colour="green" />
            </View>
          </PressableIcon>
        </HorizontalTextIconRow>
        <HorizontalTextIconRow text="Current pH color:">
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
