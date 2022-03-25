import React, {useEffect, useContext, useState} from "react";
import { StyleSheet, View, Text, FlatList } from "react-native"
import moment from 'moment';
import $api from "../http";
import { News } from "../types";
import { Card } from "react-native-elements";
import { mobileURI } from "../config/config";


const NewsScreen = ({ navigation, route }) => {

	const [news, setNews] = useState<Array<News>>([]);

    useEffect(() => {
		$api.get(`${mobileURI}/news/getnews`)
		.then(response => {
			setNews(response.data);
		})
		.catch(error => console.log(error))

	}, [])

    return(
        <View>
            <FlatList
                data={news}
                renderItem={({item}) => (
                    // <View style={styles.mainContainer}>
                    //     <View style={styles.headContainer}>
                    //         <Text>{item.name}</Text>
                    //         <Text>{moment(item.createdAt).format('LL')}</Text>
                    //     </View>
                    //     <View style={styles.contentContainer}>
                    //         <Text>{item.content}</Text>
                    //     </View>
                    // </View>
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
                )}>
            </FlatList>
        </View>
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
