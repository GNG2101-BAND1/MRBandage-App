import React from "react";
import PressableIconTextBox from "./PressableIconTextBox";

type DeviceProps = {
    deviceName: string,
    iconSource: any,
}

const DeviceBox = ({deviceName, iconSource}: DeviceProps) => {
    return <PressableIconTextBox text={deviceName} iconSource={iconSource} onPress={() => {selectDevice(deviceName)}}/>
}

function selectDevice(deviceName: string) {
    // add logic to handle device being selected here
}

export default DeviceBox;
