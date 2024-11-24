import React, {useState} from 'react';
import PressableIconTextBox from './PressableIconTextBox';
import { Peripheral } from 'react-native-ble-manager';

type DeviceProps = {
  device: Peripheral;
  iconSource: any;
  onSelect: (device: Peripheral) => void;
  viewStyle: any;
  iconStyle: any;
  textStyle: any;
  activeOpacity?: number;
};

const DeviceBox = ({
  device,
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
      text={device.name ? device.name : ''}
      iconSource={iconSource}
      onPress={() => {
        onSelect(device);
      }}
      viewStyle={viewStyle}
      iconStyle={iconStyle}
      textStyle={textStyle}
    />
  );
};

export default DeviceBox;
