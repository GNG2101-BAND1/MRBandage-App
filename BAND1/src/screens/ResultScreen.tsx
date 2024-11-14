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
        <Text style={styles.resultMessage}>Calculating...</Text>
      </ResultSection>
      <ResultSection
        iconSource={images.icons.thermometer}
        sectionTitle="Temperature">
        <View style={styles.temperatureContent}>
          <View style={styles.avgTemp}>
            <Text style={{...styles.boldText, fontSize: 40}}>{'--\u2103'}</Text>
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
            <Text style={styles.boldText}>{'H:  --\u2103'}</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            <Text style={styles.boldText}>{'L:  --\u2103'}</Text>
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
