import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from '../Styles';

type IconTextProp = {
  iconSource: any;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  text: string;
  selected: boolean;
};

const PressableIconTextBox = ({
  iconSource,
  onPress,
  text,
  selected,
}: IconTextProp) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={
          selected
            ? [
                styles.viewContainer,
                styles.leftAlignContainer,
                styles.iconTextBox,
                styles.selectedIconTextBox,
              ]
            : [
                styles.viewContainer,
                styles.leftAlignContainer,
                styles.iconTextBox,
              ]
        }>
        <Image
          style={(styles.image, styles.iconTextBoxImage)}
          source={iconSource}
        />
        <Text style={styles.heading}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default PressableIconTextBox;
