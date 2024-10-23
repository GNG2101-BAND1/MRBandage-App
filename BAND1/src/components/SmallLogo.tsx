import React from "react";
import PressableIconTextBox from "./PressableIconTextBox";

type LogoProps = {
    name: string,
}

const SmallLogo = ({name}: LogoProps) => {
    return <PressableIconTextBox iconSource="../assets/logo.png" text={name} onPress={() => {}}/>
}

export default SmallLogo;
