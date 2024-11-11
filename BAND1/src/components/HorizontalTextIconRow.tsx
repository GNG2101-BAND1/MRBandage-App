import React, {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import styles from '../Styles';

type HorizontalTextIconRowProp = PropsWithChildren<{
  text: string;
  textStyle?: object;
  iconViewContainerStyle?: object;
}>;

const HorizontalTextIconRow = ({
  children,
  text,
  textStyle = styles.text,
  iconViewContainerStyle = styles.iconViewContainer,
}: HorizontalTextIconRowProp) => {
  return (
    <View style={styles.viewContainer}>
      <Text style={textStyle}>{text}</Text>
      <View style={iconViewContainerStyle}>{children}</View>
    </View>
  );
};

export default HorizontalTextIconRow;
