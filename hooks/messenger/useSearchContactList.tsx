import React, { useState, useMemo, useLayoutEffect } from "react";
import { View, TextInput, SafeAreaView, StyleSheet } from "react-native";
import { User } from "../../types";
import { Icon } from "react-native-elements";

interface useSearchContactListProps {
    listUsers: Array<User>;
    navigation: any;
}

export const useSearchContactList = (props: useSearchContactListProps) => {
    const [searchedUser, setSearchedUser] = useState("");

    const searchedUserList = useMemo(() => {
        if (searchedUser) {
            let arrayOfArguments = searchedUser.toLowerCase().split(" ");
            arrayOfArguments = arrayOfArguments.filter((argument) => argument !== "");

            const croppedUserList = props.listUsers.filter((oneUser) => {
                for (const oneElement of arrayOfArguments) {
                    if (oneUser.name.toLowerCase().includes(oneElement)) {
                        return true;
                    }
                }
            });

            return croppedUserList;
        }
    }, [searchedUser]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "Contacts",
            header: () => (
                <SafeAreaView>
                    <View style={styles.mainHeader}>
                        <View style={styles.iconContainer}>
                            <Icon
                                type="antdesign"
                                name="arrowleft"
                                color={"#000000"}
                                onPress={props.navigation.goBack}
                            ></Icon>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                autoFocus={true}
                                onChangeText={(text) => setSearchedUser(text)}
                                placeholder="Поиск"
                                style={{ fontSize: 16, flex: 1, marginRight: 10 }}
                            ></TextInput>
                        </View>
                    </View>
                </SafeAreaView>
            ),
        });
    }, [props.navigation]);

    return searchedUserList ?? props.listUsers;
};

const styles = StyleSheet.create({
    mainHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 55,
        borderBottomColor: "white",
        borderBottomWidth: 7,
        borderTopColor: "#55ADFF",
        borderRightColor: "#55ADFF",
        borderLeftColor: "#55ADFF",
        borderTopWidth: 5,
        borderWidth: 6,
    },

    iconContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 0.2,
    },

    inputContainer: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 15,
    },
});
