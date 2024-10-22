import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

type HorizontalTextIconRowProp = {
  text: string;
  iconSrcArray: string[];
  iconOnClickArray: any;
};

const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  iconViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});

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
