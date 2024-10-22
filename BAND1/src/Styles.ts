import { StyleSheet } from "react-native";
import { colours } from "./Values";

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
});

export default styles;
