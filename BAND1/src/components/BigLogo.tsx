import React from "react";
import { Image, Text, View } from "react-native";
import styles from "../Styles";

type LogoProps = {
    name: string;
    slogan: string;
};

const BigLogo = ({name, slogan}: LogoProps) => {
    return <View style={styles.bigLogo}>
        <Image 
            source={require("../assets/logo.png")}
            alt="Smart Bandage Logo"
        />
        <View>
            <Text style={styles.appName}>{name}</Text>
            <Text style={styles.appSlogan}>{slogan}</Text>
        </View>
    </View>;
}

export default BigLogo;
