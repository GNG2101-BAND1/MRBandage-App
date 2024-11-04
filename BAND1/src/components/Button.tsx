import React from 'react';
import {GestureResponderEvent, Pressable, Text} from 'react-native';
import styles from '../Styles';

type ButtonProps = {
  onPress: null | ((event: GestureResponderEvent) => void) | undefined;
  title: String;
  buttonStyle: object;
  buttonTextStyle: object;
};

const Button = ({
  onPress,
  title,
  buttonStyle = styles.button,
  buttonTextStyle = styles.buttonText,
}: ButtonProps) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={buttonTextStyle}>{title}</Text>
    </Pressable>
  );
};

export default Button;
