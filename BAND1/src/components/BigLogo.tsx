import React from "react";
import { Image, Text, View } from "react-native";

type LogoProps = {
    name: string;
    slogan: string;
};

const BigLogo = ({name, slogan}: LogoProps) => {
    return <View>
        <Image 
            source={{uri: ""}}
            alt="Smart Bandage Logo"
        />
        <Text>{name}</Text>
        <Text>{slogan}</Text>
    </View>;
}

export default BigLogo;
