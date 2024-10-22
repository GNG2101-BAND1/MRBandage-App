import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: "row",
        width: "75%",
        alignSelf: "center"
    },

    progressBarUnitFocused: {
        flex: 2,
        margin: 5
    },

    progressBarUnitUnfocused: {
        flex: 1,
        margin: 5
    }
});

export default styles;
