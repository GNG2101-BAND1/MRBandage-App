import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {PropsWithChildren} from 'react';

const styles = StyleSheet.create({
  displayBox: {
    backgroundColor: 'White',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

type DisplayBoxProp = PropsWithChildren<{}>;

const DisplayBox = ({children}: DisplayBoxProp) => {
  return <View style={styles.displayBox}>{children}</View>;
};

export default DisplayBox;
