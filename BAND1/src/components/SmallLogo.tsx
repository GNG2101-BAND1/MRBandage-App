import React from 'react';
import PressableIconTextBox from './PressableIconTextBox';
import {images} from '../Values';
import styles from '../Styles';

type LogoProps = {
  name: string;
};

const SmallLogo = ({name}: LogoProps) => {
  return (
    <PressableIconTextBox
      iconSource={images.logo}
      text={name}
      onPress={() => {}}
      viewStyle={[styles.viewContainer, styles.leftAlignContainer]}
      iconStyle={styles.image}
      textStyle={styles.heading}
    />
  );
};

export default SmallLogo;
