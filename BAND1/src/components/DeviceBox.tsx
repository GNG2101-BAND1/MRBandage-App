import React, {useState} from 'react';
import PressableIconTextBox from './PressableIconTextBox';

type DeviceProps = {
  deviceName: string;
  iconSource: any;
  onSelect: any;
  viewStyle: any;
  iconStyle: any;
  textStyle: any;
};

const DeviceBox = ({
  deviceName,
  iconSource,
  onSelect,
  viewStyle,
  iconStyle,
  textStyle,
}: DeviceProps) => {
  return (
    <PressableIconTextBox
      text={deviceName}
      iconSource={iconSource}
      onPress={() => {
        onSelect(deviceName);
      }}
      viewStyle={viewStyle}
      iconStyle={iconStyle}
      textStyle={textStyle}
    />
  );
};

// function selectDevice(deviceName: string) {
//     // add logic to handle device being selected here
// }

export default DeviceBox;
