import React from "react";
import PressableIconTextBox from "./PressableIconTextBox";
import { images } from "../Values";

type LogoProps = {
    name: string,
}

const SmallLogo = ({name}: LogoProps) => {
    return <PressableIconTextBox iconSource={images.logo} text={name} onPress={() => {}}/>
}

export default SmallLogo;
