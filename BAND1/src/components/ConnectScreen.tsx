import React, { useState } from "react";
import { View } from "react-native";
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

    </View>;
};

export default ConnectScreen;
