import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../Styles';

type PHColorPickerProp = {
  phValue: number;
  setPhValue: any;
  getColour: any;
};

const PHColorPicker = ({phValue, setPhValue, getColour}: PHColorPickerProp) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Pick a pH Level</Text>

      <LinearGradient
        colors={['rgb(0, 255, 100)', 'rgb(0, 100, 150)']} // Green to Blue
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.modalGradient}>
        <View
          style={[
            styles.modalIndicator,
            {
              left: `${((phValue - 7.0) / 2.0) * 100}%`,
              backgroundColor: getColour(phValue),
            },
          ]}
        />
      </LinearGradient>

      <Slider
        style={styles.modalSlider}
        minimumValue={7.0}
        maximumValue={9.0}
        step={0.5}
        minimumTrackTintColor="#004b70"
        maximumTrackTintColor="#00ff66"
        thumbTintColor={getColour(phValue)}
        value={phValue}
        onValueChange={value => setPhValue(value)}
      />

      <Text style={styles.modalPHValue}>pH: {phValue.toFixed(1)}</Text>
    </View>
  );
};

export default PHColorPicker;
