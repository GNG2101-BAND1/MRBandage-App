import React, { useState } from 'react';
import { Image } from 'react-native';

type ProgressBarProps = {
    activePage: number;
    numberOfPages: number;
};

const ProgressBarUnit = (isActive: boolean) => {
    return <Image 
        source={{uri: isActive ? "" : ""}}
        alt={isActive ? "" : ""}
    />
};

const ProgressBar = ({activePage, numberOfPages}: ProgressBarProps) => {
    for (let i: number = 0; i < numberOfPages; i++) {
        
    }
}; 
