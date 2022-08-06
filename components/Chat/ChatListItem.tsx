import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { ChatRoom, Message, User } from "../../types";
import moment from "moment";
import { mobileURI } from "../../config/config";

moment.locale("ru");

type ChatListItemProps = {
    id: String;
    chatRoom: ChatRoom;
    socket: any;
};

const ChatListItem = (props: ChatListItemProps) => {
    const { id, chatRoom, socket } = props;

    const me: User = chatRoom.users.find((user) => user._id === id);
    const user: User = chatRoom.users.find((user) => user._id !== id);

    const imageUri = user.imageUri?.replace("http://localhost:5000", mobileURI);
    let titleAvatarArray = user.name.split(" ", 2);
    const titleAvatar = titleAvatarArray.map((oneName) => oneName.charAt(0)).join("");

    const dateLastMessage = moment(chatRoom.lastMessage.createdAt).format("L");

    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate("ChatRoomScreen", {
            myId: me._id,
            myName: me.name,

            id: user._id,
            name: user.name,

            socket: socket,
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
                        <Text numberOfLines={1} style={styles.username}>
                            {user.name}
                        </Text>
                        <Text numberOfLines={1} style={styles.textMessage}>
                            {chatRoom.lastMessage.content}
                        </Text>
                    </View>
                </View>

                <View style={styles.rightContainer}>
                    <Text>{dateLastMessage}</Text>
                    {chatRoom.countBadge !== 0 ? (
                        <View style={styles.countContainer}>
                            <Text style={{ color: "white" }}>{chatRoom.countBadge}</Text>
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}></View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ChatListItem;

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
        justifyContent: "space-around",
        paddingLeft: 15,
    },

    emptyContainer: {
        alignSelf: "center",
        alignItems: "center",
        width: 40,
        height: 20,
    },

    countContainer: {
        alignSelf: "center",
        alignItems: "center",
        width: 40,
        height: 20,
        backgroundColor: "#0086EA",
        borderRadius: 10,
    },
});
