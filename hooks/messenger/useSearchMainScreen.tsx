import React, { useState, useMemo, useLayoutEffect } from "react";
import { View, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { ChatRoom } from "../../types";
import { Button } from "react-native-elements";
import { RootState } from "../../store";

interface useSearchMainScreenProps {
    chatLastMessages: Array<ChatRoom>;
    navigation: any;
}

export const useSearchMainScreen = (props: useSearchMainScreenProps) => {
    const myData = useSelector((state: RootState) => state.profile);
    const { navigation, chatLastMessages } = props;

    const [searchedUser, setSearchedUser] = useState("");
    const [isVisibleSearchInput, setIsVisibleSearchInput] = useState(false);

    const searchedChatMessages = useMemo(() => {
        if (searchedUser) {
            let arrayOfArguments = searchedUser.toLowerCase().split(" ");
            arrayOfArguments = arrayOfArguments.filter((argument) => argument !== "");

            const croppedLastMessages = chatLastMessages.filter((item) => {
                return item.users.find((oneUser) => {
                    if (oneUser._id !== myData._id) {
                        for (const oneElement of arrayOfArguments) {
                            if (oneUser.name.toLowerCase().includes(oneElement)) {
                                return true;
                            }
                        }
                    }
                });
            });

            return croppedLastMessages;
        }
    }, [searchedUser]);

    useLayoutEffect(() => {
        if (isVisibleSearchInput) {
            navigation.setOptions({
                headerTitle: "",
                headerRight: () => (
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            flex: 1,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TextInput
                            autoFocus={true}
                            onChangeText={(text) => setSearchedUser(text)}
                            placeholder="Поиск"
                            style={{ fontSize: 16, flex: 1 }}
                        ></TextInput>
                        <Button
                            icon={{ type: "ionicons", name: "search", color: "#55ADFF" }}
                            type="clear"
                            onPress={() => {
                                setIsVisibleSearchInput(false);
                                setSearchedUser("");
                            }}
                        ></Button>
                    </View>
                ),
            });
        } else {
            navigation.setOptions({
                headerTitle: "Мессенджер",
                headerRight: () => (
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            icon={{ type: "ionicons", name: "search", color: "#55ADFF" }}
                            type="clear"
                            onPress={() => {
                                setIsVisibleSearchInput(true);
                            }}
                        ></Button>
                    </View>
                ),
            });
        }
    }, [isVisibleSearchInput]);

    return searchedChatMessages ?? chatLastMessages;
};
