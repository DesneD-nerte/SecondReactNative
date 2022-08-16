import React from "react";
import { StyleSheet, View, Text } from "react-native";
import XDate from "xdate";
import { AgendaLocaleConfig } from "../../config/agendaLocaleConfig";

interface IRenderDay {
    day: XDate;
}
let dayNamesShort =
    AgendaLocaleConfig.locales[AgendaLocaleConfig.defaultLocale].dayNamesShort;

const RenderDay = ({ day }: IRenderDay) => {
    if (day) {
        return (
            <View style={styles.dayContainer}>
                <Text style={styles.dayContainer__date}>{day.getDate()}</Text>
                <Text style={styles.dayContainer__day}>
                    {dayNamesShort[day.getDay()]}
                </Text>
            </View>
        );
    } else {
        return (
            <View style={{ width: 60, justifyContent: "center", alignItems: "center" }} />
        );
    }
};

export default RenderDay;

const styles = StyleSheet.create({
    dayContainer: {
        width: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    dayContainer__date: {
        fontSize: 30,
        color: "#2089dc",
    },
    dayContainer__day: {
        color: "#2089dc",
    },
});
