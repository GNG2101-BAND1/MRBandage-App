import React, { PropsWithChildren } from "react";
import { GestureResponderEvent, TouchableHighlight } from "react-native";

type PressableIconProps = PropsWithChildren<{
    onPress: ((event: GestureResponderEvent) => void) | undefined,
}>;

const PressableIcon = ({children, onPress}: PressableIconProps) => {
    return <TouchableHighlight onPress={onPress}>
        {children}
    </TouchableHighlight>
};

export default PressableIcon;