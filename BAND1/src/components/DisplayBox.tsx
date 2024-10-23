import React from 'react';
import {View} from 'react-native';
import type {PropsWithChildren} from 'react';
import styles from '../Styles';

type DisplayBoxProp = PropsWithChildren<{
  visible: boolean,
}>;

const DisplayBox = ({children, visible}: DisplayBoxProp) => {
  if (visible) {
    return <View style={styles.displayBox}>{children}</View>;
  } else {
    return <></>
  }
};

export default DisplayBox;
