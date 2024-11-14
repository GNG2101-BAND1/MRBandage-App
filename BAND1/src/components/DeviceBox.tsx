import React, {useState} from 'react';
import PressableIconTextBox from './PressableIconTextBox';

type DeviceProps = {
  deviceName: string;
  iconSource: any;
  onSelect: any;
  viewStyle: any;
  iconStyle: any;
  textStyle: any;
  activeOpacity: number;
};

const DeviceBox = ({
  deviceName,
  iconSource,
  onSelect,
  viewStyle,
  iconStyle,
  textStyle,
  activeOpacity,
}: DeviceProps) => {
  return (
    <PressableIconTextBox
      activeOpacity={activeOpacity}
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

export default DeviceBox;
