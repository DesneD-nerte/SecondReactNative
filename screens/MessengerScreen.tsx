import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { io } from 'socket.io-client';
import { Icon } from 'react-native-elements';
import Background from '../assets/WhiteBackground.jpg';
import ChatListItem from '../components/ChatListItem';
import ChatRooms from '../data/ChatRooms';
import $api from '../http';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MyJwt = {
	id: string,
	roles: [string],
	username: string
}

const MessengerScreen = ({navigation}) => {

	const [chatLastMessages, setChatLastMessages] = useState(ChatRooms);
	const [myId, setMyId] = useState('');

	useEffect(() => {
		AsyncStorage.getItem('token')
		.then((token) => {
			const tokenData = jwtDecode<MyJwt>(token);
			setMyId(tokenData.id);
			
			$api.get(`http://192.168.100.4:5000/messages/getLastMessages`, {params: { myId: tokenData.id }})
			.then((response) => {
				setChatLastMessages(response.data);
				
			})
			.catch(() => console.log("Ошибка при загрузке lastMessage"));
		})
		.catch(() => console.log('Ошибка при чтении токена'));

	}, [])

	return (
		<ImageBackground style={{width: '100%', height: '100%'}} source={Background}>
			<View style={{flex: 1}}>
				<View style={styles.messagesContainer}>
					<FlatList
						extraData={chatLastMessages}
						data={chatLastMessages}
						renderItem={({ item }) => <ChatListItem chatRoom={ item } id={myId}/>}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>

				<View style={styles.plusContainer}>
				<Icon
					reverse
					name='pencil-sharp'
					type='ionicon'
					color='#2CA5FF'
					// onPress={() => navigation.navigate('AddUser')}
					onPress={() => navigation.navigate('UsersMessengerScreen')}
				/>
				</View>

			</View>
		</ImageBackground>
	)
}

export default MessengerScreen;


const styles = StyleSheet.create({
	messagesContainer: {
		flex: 1
	},

	plusContainer: {
		position: 'absolute',
		right: 5,
		bottom: 5
	}
})