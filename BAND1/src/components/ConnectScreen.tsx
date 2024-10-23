import React, { useState } from "react";
import { Linking, Text, View } from "react-native";
import styles from "../Styles";
import BigLogo from "./BigLogo";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

const ConnectScreen = () => {
    const numberOfSteps = 3;
    const [stepNumber, setStepNumber] = useState(0);
    const [buttonText, setButtonText] = useState("Connect Device");

    return <View style={styles.screen}>
        <BigLogo name="SmartBandaid" slogan="Detect your infections early" />
        
        {/* add code to show display box here */}

        <View style={styles.bottomAlignContainer}>
            <ProgressBar numberOfPages={numberOfSteps} activePage={Math.floor(stepNumber / 2)} />

            <Button title={buttonText} onPress={() => {
                    if (!(stepNumber === 5)) {
                        switch(stepNumber + 1) {
                            case 2:
                                setButtonText("Select Device");
                                break;
                            case 3:
                                setButtonText("Connect Device");
                                break;
                            case 4:
                                setButtonText("Continue");
                                break;
                        }

                        setStepNumber(stepNumber + 1);
                    } else {
                        // move to new page
                    }
                }} />

            <View style={styles.horizontalSameLine}>
                <Text style={styles.caption}>Have a problem? See our </Text>
                <Text 
                    style={[styles.caption, styles.hyperlink]}
                    onPress={() => {Linking.openURL("https://github.com/GNG2101-BAND1/BAND1-app") /*Temp link to repo*/ }}>
                    FAQ page
                </Text>
            </View>
        </View>
    </View>;
};

export default ConnectScreen;
