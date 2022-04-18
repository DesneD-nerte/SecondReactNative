import React, {useEffect, useContext, useState} from "react";
import { StyleSheet, View, Text, FlatList, ImageBackground, RefreshControl } from "react-native"
import moment from 'moment';
import $api from "../http";
import { News } from "../types";
import { Card } from "react-native-elements";
import { mobileURI } from "../config/config";
import Background from '../assets/BlackBackground.jpg';


const NewsScreen = ({ navigation, route }) => {

	const [news, setNews] = useState<Array<News>>([]);
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        if(refreshing === true) { 
            $api.get(`${mobileURI}/news/getnews`)
            .then(response => {
                setNews(response.data);
                onRefresh(false);
            })
            .catch(error => {
                console.log(error)
                setRefreshing(false);
            })
        }
        
	}, [refreshing])


    const onRefresh = (boolean) => {
        setRefreshing(boolean);
    }

    return(
		<ImageBackground style={{width: '100%', height: '100%'}} source={Background}>
            <View>
                <FlatList
                    data={news}
                    renderItem={({item}) => (
                        <Card containerStyle={{ marginTop: 15 }}>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Divider />
                            <Text>
                                {item.content}
                            </Text>
                            <Text style={{marginTop: 10, color: 'lightgray', alignSelf: 'flex-end'}}>
                                {moment(item.createdAt).format('L')}
                            </Text>
                        </Card>
                    )}
                    keyExtractor={(item) => item.createdAt.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => onRefresh(true)}
                        />
                    }>
                </FlatList>
            </View>
        </ImageBackground>
    )
}

export default NewsScreen;


const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 20
    },

    headContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },

    contentContainer: {
        padding: 10,
        fontSize: 18
    }
});
