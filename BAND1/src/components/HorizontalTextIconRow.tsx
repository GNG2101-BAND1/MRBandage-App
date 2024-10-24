import React, { PropsWithChildren } from 'react';
import {Text, View} from 'react-native';
import styles from '../Styles';

type HorizontalTextIconRowProp = PropsWithChildren<{
  text: string;
}>;

const HorizontalTextIconRow = ({children, text}: HorizontalTextIconRowProp) => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.iconViewContainer}>
        {children}
      </View>
    </View>
  );
};

export default HorizontalTextIconRow;
