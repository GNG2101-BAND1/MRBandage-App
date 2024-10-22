import React from 'react';
import { Image, View } from 'react-native';
import styles from '../Styles';

type ProgressBarProps = {
    activePage: number;
    numberOfPages: number;
};

type ProgressBarUnitProps = {
    isActive: boolean;
    altText: string;
}

const ProgressBarUnit = ({isActive, altText}: ProgressBarUnitProps) => {
    return <Image 
        source={{uri: isActive ? "" : ""}}
        alt={altText}
    />
};

const ProgressBar = ({activePage, numberOfPages}: ProgressBarProps) => {
    return <View style={styles.progressBar}>
        {Array.from({length: numberOfPages}).map((it, i) => 
            <ProgressBarUnit isActive={i === activePage} altText={activePage + " of " + numberOfPages}/>
            )}
    </View>;
}; 

export default ProgressBar;
