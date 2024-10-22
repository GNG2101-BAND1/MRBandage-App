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
    alignContent: 'center',
  },
  iconViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  image: {
    width: 200,
  },
});

const HorizontalTextIconRow = ({
  text,
  iconSrcArray,
  iconOnClickArray,
}: HorizontalTextIconRowProp) => {
  return (
    <View style={styles.viewContainer}>
      <Text>{text}</Text>
      <View style={styles.iconViewContainer}>
        {iconSrcArray.map((iconSrc, index) => {
          return (
            <TouchableHighlight onPress={() => iconOnClickArray[index]}>
              <Image src={iconSrc} style={styles.image} />
            </TouchableHighlight>
          );
        })}
      </View>
    </View>
  );
};

export default HorizontalTextIconRow;
