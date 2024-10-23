import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import styles from '../Styles';

type HorizontalTextIconRowProp = {
  text: string;
  iconSrcArray: string[];
  iconOnClickArray: any;
};

const HorizontalTextIconRow = ({
  text,
  iconSrcArray,
  iconOnClickArray,
}: HorizontalTextIconRowProp) => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.iconViewContainer}>
        {iconSrcArray.map((iconSrc, index) => {
          return (
            <TouchableHighlight key={index} onPress={iconOnClickArray[index]}>
              <Image source={{uri: iconSrc}} style={styles.image} />
            </TouchableHighlight>
          );
        })}
      </View>
    </View>
  );
};

export default HorizontalTextIconRow;
