import React from 'react';
import {View} from 'react-native';
import type {PropsWithChildren} from 'react';
import styles from '../Styles';

type DisplayBoxProp = PropsWithChildren<{}>;

const DisplayBox = ({children}: DisplayBoxProp) => {
  return <View style={styles.displayBox}>{children}</View>;
};

export default DisplayBox;
