import { StyleSheet } from "react-native";
import { colours, values } from "./Values";

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: "row",
        width: "50%",
        alignSelf: "center"
    },

    progressBarUnitFocused: {
        flex: 2,
        margin: 5
    },

    progressBarUnitUnfocused: {
        flex: 1,
        margin: 5
    },

    appName: {
        margin: 10,
        fontSize: 36,
        color: colours.brandDarkRed
    },

    appSlogan: {
        margin: 5,
        fontSize: 15,
        color: colours.brandLightOrange
    },

    bigLogo: {
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        width: "80%",
        marginTop: "40%"
    }
});

export default styles;
