import React from "react";
import Svg, { Circle } from "react-native-svg";

type CircleProps = {
    colour: string,
};

const ColouredCircle = ({colour}: CircleProps) => {
    return <Svg height='100%' width='100%' viewBox='0 0 100 100'>
        <Circle r='45' cx='50' cy='50' fill={colour} stroke={(colour === 'white' ? 'black' : colour)} />
    </Svg>
};

export default ColouredCircle;
