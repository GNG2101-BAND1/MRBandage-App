import { StyleSheet } from "react-native";
import { colours } from "./Values";

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colours.bgColour,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },

    progressBar: {
        flexDirection: "row",
        width: "50%",
        alignSelf: "center",
        flex: 1,
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
        color: colours.brandDarkRed,
        textAlign: "center",
    },

    appSlogan: {
        margin: 5,
        fontSize: 15,
        color: colours.brandLightOrange,
        textAlign: "center",
    },

    bigLogo: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "80%",
        height: "50%",
        flex: 2,
    },

    displayBox: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
    },

    viewContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    text: {
        color: colours.textDarkBlue,
        fontSize: 15,
    },
    
    iconViewContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    
    image: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },

    button: {
        flex: 1,
    },
});

export default styles;
