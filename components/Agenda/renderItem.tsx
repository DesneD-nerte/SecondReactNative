import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import useRenderItem from "../../hooks/agenda/useRenderItem";
import { CurrentLesson } from "../../types";

interface IRenderItemAgendaProps {
    item: CurrentLesson;
}

const RenderItem: FC<IRenderItemAgendaProps> = (props) => {
    const displayItem = useRenderItem(props);

    return (
        <TouchableOpacity style={styles.container}>
            {displayItem && (
                <View style={styles.mainContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemContainer__title}>
                            {displayItem.title}
                        </Text>
                        <Text>
                            {displayItem.beginTime} - {displayItem.endTime}
                        </Text>
                        <Text>{displayItem.classroom}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        {displayItem.teacher.imageUri ? (
                            <Avatar
                                size={30}
                                rounded
                                source={{ uri: displayItem.teacher.imageUri }}
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
                        <Text>{displayItem.teacher.name}</Text>
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
