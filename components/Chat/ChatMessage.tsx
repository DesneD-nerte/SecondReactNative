import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Message } from "../../types";
import moment from "moment";
import "moment/src/locale/en-gb";
import "moment/min/locales";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

moment.locale("ru");

type ChatMessageProps = {
    message: Message;
};

type MyJwt = {
    id: string;
    roles: [string];
    username: string;
};

function ChatMessage(props: ChatMessageProps) {
    const { message } = props;
    const [myId, setMyId] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("token").then((token) => {
            const tokenData = jwtDecode<MyJwt>(token);
            setMyId(tokenData.id);
        });
    }, []);

    const isMyMessage = () => {
        return message.user._id === myId;
    };

    const dateMessage = moment(message.createdAt).format("LT");

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.messageBox,
                    {
                        backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
                        marginLeft: isMyMessage() ? 50 : 0,
                        marginRight: isMyMessage() ? 0 : 50,
                    },
                ]}
            >
                <Text style={styles.messageContent}>{message.content}</Text>
                <Text style={styles.messageCreated}>{dateMessage}</Text>
            </View>
        </View>
    );
}

export default ChatMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },

    messageBox: {
        backgroundColor: "#DBDBDB",
        marginVertical: 5,
        marginRight: 50,
        borderRadius: 10,
        padding: 10,
        paddingBottom: 5,
    },
    messageContent: {
        fontSize: 16,
    },
    messageCreated: {
        alignSelf: "flex-end",
    },
});
