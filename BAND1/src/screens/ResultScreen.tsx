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

const ResultSection = ({children, iconSource, sectionTitle}: SectionProps) => {
    return <View>
        <PressableIconTextBox iconSource={iconSource} text={sectionTitle} onPress={undefined}/>
        <DisplayBox visible={true}>
            {children}
        </DisplayBox>
    </View>
}

const ResultScreen = ({navigation} : any) => {
    const [message, setMessage] = useState("Device Connected");

    return <View style={styles.screen}>
        <SmallLogo name="SmartBandaid"/>

        <View style={styles.bottomAlignContainer}>
            <Text style={styles.appSlogan}>{message}</Text>
            <ProgressBar numberOfPages={3} activePage={-1}/> {/* dummy progress bar with no active page for aesthetics */}
        </View>

        <ResultSection iconSource={images.icons.heart} sectionTitle="Result"></ResultSection>
        <ResultSection iconSource={images.icons.thermometer} sectionTitle="Temperature"></ResultSection>
        <ResultSection iconSource={images.icons.drop} sectionTitle="pH Level"></ResultSection>
    </View>
}

export default ResultScreen;
