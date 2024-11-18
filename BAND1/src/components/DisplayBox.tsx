import React from 'react';
import {View} from 'react-native';
import type {PropsWithChildren} from 'react';
import styles from '../Styles';

type DisplayBoxProp = PropsWithChildren<{
  visible: boolean;
  viewStyle?: any;
}>;

const DisplayBox = ({children, visible, viewStyle = {}}: DisplayBoxProp) => {
  if (visible) {
    return <View style={{...styles.displayBox, ...viewStyle}}>{children}</View>;
  } else {
    return <></>;
  }
};

export default DisplayBox;
