import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet, ImageBackground } from "react-native";
import { Text } from "react-native-elements";
import ChatMessage from "../components/Chat/ChatMessage";
import InputBox from "../components/Chat/InputBox";
import Background from "../assets/WhiteBackground.jpg";
import DateMessage from "../services/DateMessage";
import { ChatType } from "../types";

let currentDate = new Date("1970.01.01");
let previousDate = new Date("1970-01-01");

const monthNames = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
];

type ChatRoomScreenProps = {
    myId: string;
    myName: string;
    id: string;
    name: string;
    socket: any;
};

function ChatRoomScreen({ route }) {
    const flatListRef = useRef<any>();

    const { myId, id, socket } = route.params;

    const countSkipMessages = useRef<number>(20);
    const roomId = useRef<string>();
    const [chatMessages, setChatMessages] = useState<ChatType>({
        users: [],
        messages: [],
    });

    useEffect(() => {
        socket.current.emit("onEnterTheRoom", { myId, id });

        socket.current.on("loadInitialRoomMessages", (messages) => {
            setChatMessages(messages);
            roomId.current = messages._id;
        });

        socket.current.on("updateRoomMessages", (message) => {
            setChatMessages((prevChatMessages) => ({
                ...prevChatMessages,
                messages: [...prevChatMessages.messages, message],
            }));
        });

        socket.current.on("loadNewRoomMessages", (messages) => {
            if (messages) {
                setChatMessages((prevChatMessages) => ({
                    ...prevChatMessages,
                    messages: [...messages.messages, ...prevChatMessages.messages],
                }));
            }
        });
    }, []);

    const viewabilityConfig = {
        waitForInteraction: true,
        // viewAreaCoveragePercentThreshold: 100,
        itemVisiblePercentThreshold: 0,
    };

    const onViewableItemsChanged = ({ viewableItems, changed }) => {
        const items = viewableItems;
        const updateVisibleMessages = items
            .filter((flatListObject) => {
                return flatListObject.item.isVisible === false;
            })
            .filter((flatListObject) => {
                return flatListObject.item.user._id === id;
            })
            .reduce((prev, curr, index) => {
                prev[index] = curr.item;
                prev.length = index + 1;

                return prev;
            }, {});

        const arrayUpdateVisibleMessages = Array.from(updateVisibleMessages);

        socket.current.emit("onUpdateVisibleMessages", {
            id: id,
            roomId: roomId.current,
            messages: arrayUpdateVisibleMessages,
        });

        setTimeout(() => {
            if (items.some((oneItem) => oneItem.index === 0)) {
                const skip = countSkipMessages.current;
                socket.current.emit("onLoadNewMessages", { myId, id, skip });

                countSkipMessages.current += 20;
            }
        }, 2000);
    };

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ]);

    return (
        <ImageBackground style={{ width: "100%", height: "100%" }} source={Background}>
            <View style={styles.container}>
                {!chatMessages.messages.length ? (
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>Сообщений нет</Text>
                    </View>
                ) : (
                    <FlatList
                        extraData={chatMessages}
                        // inverted
                        data={[...chatMessages.messages]}
                        viewabilityConfigCallbackPairs={
                            viewabilityConfigCallbackPairs.current
                        }
                        renderItem={({ item, index }) => {
                            currentDate = new Date(item.createdAt);

                            if (DateMessage.CheckDateMessage(currentDate, previousDate)) {
                                //один и тот же день
                                previousDate = currentDate;
                                const jsxToReturn = (
                                    <View>
                                        <View
                                            style={{
                                                backgroundColor:
                                                    "rgba(163, 163, 163, 0.5)",
                                                borderRadius: 30,
                                                paddingHorizontal: 5,
                                                paddingVertical: 3,
                                                alignSelf: "center",
                                            }}
                                        >
                                            <Text>
                                                {previousDate.getDate() +
                                                    " " +
                                                    monthNames[previousDate.getMonth()]}
                                            </Text>
                                        </View>
                                        <ChatMessage message={item}></ChatMessage>
                                    </View>
                                );
                                return jsxToReturn;
                            }
                            if (index === 0) {
                                const jsxToReturn = (
                                    <View>
                                        <View
                                            style={{
                                                backgroundColor:
                                                    "rgba(163, 163, 163, 0.5)",
                                                borderRadius: 30,
                                                paddingHorizontal: 5,
                                                paddingVertical: 3,
                                                alignSelf: "center",
                                            }}
                                        >
                                            <Text>
                                                {previousDate.getDate() +
                                                    " " +
                                                    monthNames[previousDate.getMonth()]}
                                            </Text>
                                        </View>
                                        <ChatMessage message={item}></ChatMessage>
                                    </View>
                                );
                                return jsxToReturn;
                            }
                            return <ChatMessage message={item}></ChatMessage>;
                        }}
                        keyExtractor={(item) => item._id.toString()}
                        onLayout={() => {
                            setTimeout(() => {
                                flatListRef.current.scrollToEnd({ animated: true });
                            }, 1000);
                        }}
                        ref={flatListRef}
                    ></FlatList>
                )}
                <InputBox socket={route.params.socket} params={route.params}></InputBox>
            </View>
        </ImageBackground>
    );
}

export default React.memo(ChatRoomScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    messageBox: {
        backgroundColor: "#DBDBDB",
    },

    loading: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    loadingText: {
        fontSize: 16,
    },
});
