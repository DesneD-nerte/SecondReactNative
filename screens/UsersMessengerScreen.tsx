import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import UsersMessangerItem from '../components/Chat/UsersMessangerItem'
import { mobileURI } from '../config/config';
import ChatRooms from '../data/ChatRooms';
import $api from '../http';

export const UsersMessengerScreen = () => {

	useEffect(() => {
		$api.get(`${mobileURI}/api/users/all`, {params: { myId: '61dd80af4b4cec30d30ab908' }})
		.then((response) => {
			//setChatLastMessages(response.data);
			console.log(response.data);
		})
		.catch(() => console.log("Ошибка при загрузке lastMessage"));
	}, [])

	return (
		<View>
			<FlatList
				data={ChatRooms}
				renderItem={({ item }) => <UsersMessangerItem chatRoom={item}/>}
			/>
		</View>
	)
}
