import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ImageBackground,
    RefreshControl,
} from "react-native";
import moment from "moment";
import { News } from "../types";
import { Card } from "react-native-elements";
import { mobileURI } from "../config/config";
import Background from "../assets/BlackBackground.jpg";
import axios from "axios";

const NewsScreen = ({ navigation, route }) => {
    const [news, setNews] = useState<Array<News>>([]);
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        if (refreshing === true) {
            axios
                .get(`${mobileURI}/news/getnews`)
                .then((response) => {
                    setNews(response.data);
                    onRefresh(false);
                })
                .catch((error) => {
                    console.log(error);
                    setRefreshing(false);
                });
        }
    }, [refreshing]);

    const onRefresh = (boolean) => {
        setRefreshing(boolean);
    };

    return (
        <ImageBackground style={styles.imageBackground} source={Background}>
            <View>
                <FlatList
                    data={news}
                    renderItem={({ item }) => (
                        <Card containerStyle={{ marginTop: 15 }}>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Divider />
                            <Text>{item.content}</Text>
                            <Text style={styles.containerStyle__Text}>
                                {moment(item.createdAt).format("L")}
                            </Text>
                        </Card>
                    )}
                    keyExtractor={(item) => item.createdAt.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => onRefresh(true)}
                        />
                    }
                ></FlatList>
            </View>
        </ImageBackground>
    );
};

export default NewsScreen;

const styles = StyleSheet.create({
    imageBackground: {
        width: "100%",
        height: "100%",
    },
    containerStyle__Text: {
        marginTop: 10,
        color: "lightgray",
        alignSelf: "flex-end",
    },
});
