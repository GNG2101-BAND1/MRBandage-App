import React from "react";
import { GestureResponderEvent, Pressable, Text } from "react-native";
import styles from "../Styles";

type ButtonProps = {
    onPress: null | ((event: GestureResponderEvent) => void) | undefined,
    title: String,
}

const Button = ({onPress, title}: ButtonProps) => {
    return <Pressable style={styles.button} onPress={onPress}>
        <Text>{title}</Text>
    </Pressable>
}

export default Button;
