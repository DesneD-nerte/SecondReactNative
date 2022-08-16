import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import UsersMessangerItem from "../components/Chat/UsersMessangerItem";
import { mobileURI } from "../config/config";
import { useSearchContactList } from "../hooks/messenger/useSearchContactList";
import { User } from "../types";

export const UsersMessengerScreen = ({ navigation, route }) => {
    const { socket } = route.params;

    const myData = useSelector((state) => state.profile);

    const [listUsers, setListUsers] = useState<Array<User>>([]);
    const searchedListUsers = useSearchContactList({ listUsers, navigation });

    useEffect(() => {
        axios
            .get(`${mobileURI}/users/all`, { params: { _id: myData._id } })
            .then((response) => {
                setListUsers(response.data);
            })
            .catch(() => console.log("Ошибка при загрузке контактов"));
    }, []);

    return (
        <View>
            <FlatList
                data={searchedListUsers}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <UsersMessangerItem me={myData} user={item} socket={socket} />
                )}
            />
        </View>
    );
};
