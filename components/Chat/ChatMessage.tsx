import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Message } from "../../types";
import moment from "moment";
import "moment/min/locales";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

moment.locale("ru");

type ChatMessageProps = {
    message: Message;
};

function ChatMessage(props: ChatMessageProps) {
    const { message } = props;
    const { _id } = useSelector((state: RootState) => state.profile);

    const isMyMessage = useMemo(() => {
        return message.user._id === _id;
    }, []);

    const dateMessage = moment(message.createdAt).format("LT");

    return (
        <View style={styles.container} key={message._id}>
            <View
                style={[
                    styles.messageBox,
                    {
                        backgroundColor: isMyMessage ? "#DCF8C5" : "white",
                        marginLeft: isMyMessage ? 50 : 0,
                        marginRight: isMyMessage ? 0 : 50,
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
