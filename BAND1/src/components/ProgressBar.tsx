import React from 'react';
import { Image, View } from 'react-native';
import styles from '../Styles';

type ProgressBarProps = {
    activePage: number;
    numberOfPages: number;
};

type ProgressBarUnitProps = {
    isActive: boolean;
}

const ProgressBarUnit = (isActive: ProgressBarUnitProps) => {
    return <Image 
        source={{uri: isActive ? "" : ""}}
        alt={isActive ? "" : ""}
    />
};

const ProgressBar = ({activePage, numberOfPages}: ProgressBarProps) => {
    return <View style={styles.progressBar}>
        {Array.from({length: numberOfPages}).map((it, i) => <ProgressBarUnit isActive={i === activePage}/>)}
    </View>;
}; 

export default ProgressBar;
