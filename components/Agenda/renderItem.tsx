import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { mobileURI } from "../../config/config";
import { CurrentLesson, User } from "../../types";

interface IRenderItemAgendaProps {
    item: CurrentLesson;
}

interface IRenderItemAgenda {
    title: string;
    beginTime: string;
    endTime: string;
    classroom: string;
    teacher: User;
}

moment.locale("ru");

const RenderItem = ({ item }: IRenderItemAgendaProps) => {
    const [fixedItem, setFixedItem] = useState<IRenderItemAgenda>();

    useEffect(() => {
        const beginDate = new Date(item.beginDate);
        const endDate = new Date(item.endDate);

        const beginTime = moment(beginDate).format("HH:mm");
        const endTime = moment(endDate).format("HH:mm");

        let fixedImageUri = undefined;
        if (item.teachers[0].imageUri !== undefined) {
            fixedImageUri = item.teachers[0].imageUri.replace(
                "http://localhost:5000",
                mobileURI
            );
        }

        const arrayName = item.teachers[0].name.split(" ");
        let splittedName = "";
        for (let i = 0; i < arrayName.length; i++) {
            if (i === 0) {
                splittedName += arrayName[i] + " ";
            } else {
                splittedName += arrayName[i].slice(0, 1) + ".";
            }
        }

        setFixedItem({
            title: item.name.name,
            beginTime: beginTime,
            endTime: endTime,
            classroom: item.classroom.name,
            teacher: {
                ...item.teachers[0],
                imageUri: fixedImageUri,
                name: splittedName,
            },
        });
    }, []);

    return (
        <TouchableOpacity style={styles.container}>
            {fixedItem && (
                <View style={styles.mainContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemContainer__title}>{fixedItem.title}</Text>
                        <Text>
                            {fixedItem.beginTime} - {fixedItem.endTime}
                        </Text>
                        <Text>{fixedItem.classroom}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        {fixedItem.teacher.imageUri ? (
                            <Avatar
                                size={30}
                                rounded
                                source={{ uri: fixedItem.teacher.imageUri }}
                            ></Avatar>
                        ) : (
                            <Avatar
                                size={30}
                                rounded
                                icon={{
                                    type: "font-awesome",
                                    name: "user",
                                    color: "#5387E7",
                                }}
                                overlayContainerStyle={{ backgroundColor: "#DBDBDB" }}
                            ></Avatar>
                        )}
                        <Text>{fixedItem.teacher.name}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default React.memo(RenderItem);

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },

    mainContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        height: 75,
        padding: 5,
        alignItems: "center",
        flex: 1,
    },

    itemContainer: {
        alignItems: "center",
        flex: 1,
    },

    itemContainer__title: {
        fontWeight: "bold",
    },
});
