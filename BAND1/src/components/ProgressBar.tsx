import React from 'react';
import { View } from 'react-native';
import styles from '../Styles';
import {colours, values} from '../Values';
import Svg, { Line } from 'react-native-svg';

type ProgressBarProps = {
    activePage: number;
    numberOfPages: number;
};

type ProgressBarUnitProps = {
    isActive: boolean;
}

const ProgressBarUnit = ({isActive}: ProgressBarUnitProps) => {
    return <View style={isActive ? styles.progressBarUnitFocused : styles.progressBarUnitUnfocused}>
            <Svg height={values.progressBarWidth * 2} width="100%" viewBox='0 0 100 10'>
                <Line 
                    x1="5" x2="95" y1="5" y2="5"
                    stroke={isActive ? colours.brandLightRed : colours.brandPaleRed}
                    strokeLinecap='round'
                    strokeWidth={values.progressBarWidth}
                />
            </Svg>
        </View>
};

const ProgressBar = ({activePage, numberOfPages}: ProgressBarProps) => {
    return <View style={styles.progressBar}>
        {Array.from({length: numberOfPages}).map((it, i) => 
            <ProgressBarUnit key={i} isActive={i === activePage} />
            )}
    </View>;
}; 

export default ProgressBar;
