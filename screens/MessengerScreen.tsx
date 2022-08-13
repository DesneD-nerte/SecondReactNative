import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, ImageBackground, FlatList } from "react-native";
import { io } from "socket.io-client";
import { Icon } from "react-native-elements";
import Background from "../assets/WhiteBackground.jpg";
import ChatListItem from "../components/Chat/ChatListItem";
import { ChatRoom } from "../types";
import { useSelector } from "react-redux";
import { mobileURI } from "../config/config";
import { useFocusEffect } from "@react-navigation/native";
import { useSearchMainScreen } from "../hooks/messenger/useSearchMainScreen";

const MessengerScreen = ({ navigation }) => {
    const myData = useSelector((state) => state.profileData);

    const [chatLastMessages, setChatLastMessages] = useState<Array<ChatRoom>>([]);
    const searchedChatMessages = useSearchMainScreen({ chatLastMessages, navigation });

    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(`${mobileURI}`).emit("logged-in", myData._id);

        socket.current.on("updateLastMessages", (data) => {
            setChatLastMessages(data);
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            socket.current.emit("logged-in", myData._id);
        }, [myData])
    );

    return (
        <ImageBackground style={{ width: "100%", height: "100%" }} source={Background}>
            <View style={{ flex: 1 }}>
                <View style={styles.messagesContainer}>
                    <FlatList
                        extraData={searchedChatMessages}
                        data={searchedChatMessages}
                        renderItem={({ item }) => (
                            <ChatListItem
                                chatRoom={item}
                                id={myData._id}
                                socket={socket}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={styles.plusContainer}>
                    <Icon
                        reverse
                        name="pencil-sharp"
                        type="ionicon"
                        color="#2CA5FF"
                        onPress={() =>
                            navigation.navigate("UsersMessengerScreen", {
                                socket: socket,
                            })
                        }
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default MessengerScreen;

const styles = StyleSheet.create({
    messagesContainer: {
        flex: 1,
    },

    plusContainer: {
        position: "absolute",
        right: 5,
        bottom: 5,
    },
});
