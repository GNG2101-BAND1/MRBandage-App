import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Text, View, Modal, TouchableOpacity, Alert} from 'react-native';
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
import PHColorPicker from '../components/PHColorPicker';
import notifee from '@notifee/react-native';

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
  const POSITIVE_MESSAGE =
    'Elevated pH and temperature levels suggest possible infection.';
  const NEGATIVE_MESSAGE =
    'Wound is in good condition. Keep it clean and protected.';

  const [avgTemp, setAvgTemp] = useState(User.getAverageTemp());
  const [lowTemp, setLowTemp] = useState(User.getMinTemp());
  const [highTemp, setHighTemp] = useState(User.getMaxTemp());
  const [message, setMessage] = useState('Device Connected');
  const [result, setResult] = useState(false);
  const [phValue, setPhValue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const getColour = ph => {
    const ratio = (ph - 7.0) / 2.0; // Map pH 7.0-9.0 to 0-1

    // Start color: rgb(0, 255, 100)
    const startR = 0,
      startG = 255,
      startB = 100;

    // End color: rgb(0, 100, 150)
    const endR = 0,
      endG = 100,
      endB = 150;

    // Interpolate each RGB component
    const r = Math.round((1 - ratio) * startR + ratio * endR);
    const g = Math.round((1 - ratio) * startG + ratio * endG);
    const b = Math.round((1 - ratio) * startB + ratio * endB);

    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    User.on(User.avgTempChange, setAvgTemp);
    User.on(User.maxTempChange, setHighTemp);
    User.on(User.minTempChange, setLowTemp);
    User.on(User.infectionStatusChange, result => {
      setResult(result);
      onDisplayNotification(
        'Result Updated',
        result ? POSITIVE_MESSAGE : NEGATIVE_MESSAGE,
      );
    });
    User.on(User.batteryWarning, currentBattery => {
      onDisplayNotification(
        'Low Battery Warning',
        `Battery is currently at: ${currentBattery}`,
      );
    });
    User.on(User.highTemp, () => {
      onDisplayNotification('High temperature detected', 'Please check pH.');
    });

    return () => {
      User.removeAllListeners();
    };
  });

  async function onDisplayNotification(title: string, body: string) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

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
        <Text
          style={{
            ...styles.resultHeading,
            color: result ? colours.brandDarkRed : colours.textDarkBlue,
          }}>
          {result ? 'POSITIVE' : 'NEGATIVE'}{' '}
        </Text>
        <Text
          style={{
            ...styles.resultMessage,
            color: result ? colours.brandLightOrange : colours.brandPalePurple,
          }}>
          {result ? POSITIVE_MESSAGE : NEGATIVE_MESSAGE}{' '}
        </Text>
      </ResultSection>
      <ResultSection
        iconSource={images.icons.thermometer}
        sectionTitle="Temperature">
        <View style={styles.temperatureContent}>
          <View style={styles.avgTemp}>
            <Text style={{...styles.boldText, fontSize: 40}}>
              {avgTemp ? avgTemp + '\u2103' : '--' + '\u2103'}
            </Text>
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
            <Text style={styles.boldText}>
              {highTemp ? 'H:  ' + highTemp + '\u2103' : 'H: --' + '\u2103'}
            </Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            <Text style={styles.boldText}>
              {lowTemp ? 'L:  ' + lowTemp + '\u2103' : 'L: --' + '\u2103'}
            </Text>
          </View>
        </View>
      </ResultSection>
      <ResultSection iconSource={images.icons.drop} sectionTitle="pH Level">
        <HorizontalTextIconRow
          textStyle={styles.boldText}
          text="Current pH color:">
          <PressableIcon
            onPress={() => {
              setModalVisible(true);
            }}>
            <View style={styles.image}>
              <ColouredCircle
                colour={phValue === 0 ? 'white' : getColour(phValue)}
              />
            </View>
          </PressableIcon>
        </HorizontalTextIconRow>
        <Text style={styles.modalPHValue}>
          Current pH: {phValue != 0 ? phValue.toFixed(1) : 'Not selected'}
        </Text>
      </ResultSection>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <PHColorPicker
              phValue={phValue}
              setPhValue={value => {
                setPhValue(value);
                User.updatePH(value);
              }}
              getColour={getColour}></PHColorPicker>

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResultScreen;
