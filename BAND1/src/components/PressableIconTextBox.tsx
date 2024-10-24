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
            <View style={[styles.viewContainer, styles.leftAlignContainer]}>
                <Image style={styles.image} source={iconSource} />
                <Text style={styles.heading}>{text}</Text>
            </View>
        </TouchableHighlight>
}

export default PressableIconTextBox;
