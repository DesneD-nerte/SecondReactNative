import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ChatType, User } from "../../types";
import { mobileURI } from "../../config/config";

type ChatListItemProps = {
    me: User;
    user: User;
    socket: any;
};

function UsersMessangerItem(props: ChatListItemProps) {
    const me = props.me;
    const user = props.user;

    const imageUri = user.imageUri?.replace("http://localhost:5000", mobileURI);
    let titleAvatarArray = user.name.split(" ", 2);
    const titleAvatar = titleAvatarArray.map((oneName) => oneName.charAt(0)).join("");

    const navigation = useNavigation();

    const chatRoom: ChatType = {
        users: [me, user],
        messages: [],
    };

    const onClick = () => {
        navigation.navigate("ChatRoomScreen", {
            myId: me._id,
            myName: me.name,

            id: user._id,
            name: user.name,

            chatRoom: chatRoom,

            socket: props.socket,
        });
    };

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    {imageUri ? (
                        <Avatar
                            size={54}
                            rounded
                            source={imageUri ? { uri: imageUri } : {}}
                        ></Avatar>
                    ) : (
                        <Avatar
                            size={54}
                            rounded
                            title={titleAvatar}
                            titleStyle={{ color: "white" }}
                            containerStyle={{ backgroundColor: "#52B4FF" }}
                        ></Avatar>
                    )}
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default UsersMessangerItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        width: "100%",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "lightgray",
    },

    leftContainer: {
        flexDirection: "row",
        flex: 1, //!!
    },

    midContainer: {
        flexDirection: "column",
        flex: 1,
        paddingLeft: 10,
        justifyContent: "space-around",
        width: "100%",
    },

    username: {
        fontWeight: "bold",
        fontSize: 16,
    },

    textMessage: {
        width: "100%",
    },

    rightContainer: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },

    countContainer: {
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#0086EA",
        borderRadius: 10,
        width: 40,
        height: 20,
    },
});
