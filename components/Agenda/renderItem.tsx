import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Avatar } from "react-native-elements";

const RenderItem = ({ item }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.itemContainer}>
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                    <Text>
                        {item.beginTime} - {item.endTime}
                    </Text>
                    <Text>{item.classroom}</Text>
                </View>
                <View style={styles.itemContainer}>
                    {item.teacher.imageUri ? (
                        <Avatar
                            size={30}
                            rounded
                            source={{ uri: item.teacher.imageUri }}
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
                    <Text>{item.teacher.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RenderItem;

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
});
