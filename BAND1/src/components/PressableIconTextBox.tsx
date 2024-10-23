import React from "react";
import { GestureResponderEvent, Image, Text, TouchableHighlight, View } from "react-native";
import styles from "../Styles";

type IconTextProp = {
    iconSource: any,
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    text: string,
}

const PressableIconTextBox = ({iconSource, onPress, text}: IconTextProp) => {
    return <TouchableHighlight onPress={onPress}>
            <View style={styles.iconViewContainer}>
                <Image source={iconSource} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableHighlight>
}

export default PressableIconTextBox;
