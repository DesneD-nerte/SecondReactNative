import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Divider } from "react-native-elements";

const EmptyDay = () => {
    return (
        <View style={styles.emptyDateContainer}>
            <Text>Нет предметов</Text>
            <Divider />
        </View>
    );
};

export default EmptyDay;

const styles = StyleSheet.create({
    emptyDateContainer: {
        display: "flex",
        flex: 1.5,
        justifyContent: "center",
        marginLeft: 5,
    },
});
