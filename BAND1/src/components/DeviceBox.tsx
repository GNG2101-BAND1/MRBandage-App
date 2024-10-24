import React, {useState} from 'react';
import PressableIconTextBox from './PressableIconTextBox';

type DeviceProps = {
  deviceName: string;
  iconSource: any;
  onSelect: any;
  selected: boolean;
};

const DeviceBox = ({
  deviceName,
  iconSource,
  onSelect,
  selected,
}: DeviceProps) => {
  return (
    <PressableIconTextBox
      text={deviceName}
      iconSource={iconSource}
      onPress={() => {
        onSelect(deviceName);
      }}
      selected={selected}
    />
  );
};

// function selectDevice(deviceName: string) {
//     // add logic to handle device being selected here
// }

export default DeviceBox;
