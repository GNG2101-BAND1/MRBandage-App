import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

type IconTextProp = {
  iconSource: any;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  text: string;
  viewStyle: any;
  iconStyle: any;
  textStyle: any;
};

const PressableIconTextBox = ({
  iconSource,
  onPress,
  text,
  viewStyle,
  iconStyle,
  textStyle,
}: IconTextProp) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="white"
      onPress={onPress}>
      <View style={viewStyle}>
        <Image style={iconStyle} source={iconSource} />
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default PressableIconTextBox;
