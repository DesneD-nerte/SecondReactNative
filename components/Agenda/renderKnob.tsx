import React from "react";
import { StyleSheet, View } from "react-native";

const renderKnob = () => {
    return <View style={styles.knobContainer} />;
};

export default renderKnob;

const styles = StyleSheet.create({
    knobContainer: {
        flex: 1,
        paddingHorizontal: 25,
        marginVertical: 7.5,
        backgroundColor: "lightgray",
        borderRadius: 20,
    },
});
