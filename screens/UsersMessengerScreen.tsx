import React from 'react'
import { View, Text, FlatList } from 'react-native'
import UsersMessangerItem from '../components/UsersMessangerItem'
import ChatRooms from '../data/ChatRooms';

export const UsersMessengerScreen = () => {
	return (
		<View>
			<FlatList
				data={ChatRooms}
				renderItem={({ item }) => <UsersMessangerItem chatRoom={item}/>}
			/>
		</View>
	)
}
