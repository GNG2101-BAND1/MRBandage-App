import React, { PropsWithChildren, useState } from "react";
import { Text, View } from "react-native";
import styles from "../Styles";
import SmallLogo from "../components/SmallLogo";
import ProgressBar from "../components/ProgressBar";
import PressableIconTextBox from "../components/PressableIconTextBox";
import DisplayBox from "../components/DisplayBox";
import { images } from "../Values";

type SectionProps = PropsWithChildren<{
    iconSource: any,
    sectionTitle: string,
}>;

type MessageProps = {
    message: string,
};

const ResultSection = ({children, iconSource, sectionTitle}: SectionProps) => {
    return <View style={[styles.sectionContainer, styles.spacedEvenlyContainer]}>
        <PressableIconTextBox iconSource={iconSource} text={sectionTitle} onPress={undefined}/>
        <DisplayBox visible={true}>
            {children}
        </DisplayBox>
    </View>
}

const InfoBox = ({message}: MessageProps) => {
    return <Text style={styles.appSlogan}>{message}</Text>
}

const ResultScreen = ({navigation} : any) => {
    const [message, setMessage] = useState("Device Connected");

    return <View style={styles.screen}>
        <View style={[styles.sectionContainer, styles.spacedEvenlyContainer]}>
            <SmallLogo name={"Smart\nBandaid"}/>

            <View style={[styles.sectionContainer, styles.centerAlignContainer, styles.bottomAlignContainer]}>
                <InfoBox message={message}/>
                <ProgressBar numberOfPages={3} activePage={-1}/>
            </View>
        </View>

        <ResultSection iconSource={images.icons.heart} sectionTitle="Result"></ResultSection>
        <ResultSection iconSource={images.icons.thermometer} sectionTitle="Temperature"></ResultSection>
        <ResultSection iconSource={images.icons.drop} sectionTitle="pH Level"></ResultSection>
    </View>
}

export default ResultScreen;
