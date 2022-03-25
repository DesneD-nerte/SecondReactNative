import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { io } from 'socket.io-client';
import { Icon } from 'react-native-elements';
import Background from '../assets/WhiteBackground.jpg';
import ChatListItem from '../components/Chat/ChatListItem';
import ChatRooms from '../data/ChatRooms';
import $api from '../http';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatRoom } from '../types';
import { useSelector } from 'react-redux';
import { mobileURI } from '../config/config';

type MyJwt = {
	id: string,
	roles: [string],
	username: string
}


const MessengerScreen = ({navigation}) => {

	const user = useSelector((state) => ({...state.profileData}));

	const [chatLastMessages, setChatLastMessages] = useState<ChatRoom>();
	const [myId, setMyId] = useState('');
	const [socket, setSocket] = useState(null);
	
	// socket?.on('connect', () => {
	// 	console.log('client connected');
	// });

	// socket?.on('getMessages', () => {
	// 	console.log('getMessages event client');
	// });

	// useEffect(() => {
	// 	AsyncStorage.getItem('token')
	// 	.then((token) => {
	// 		const tokenData = jwtDecode<MyJwt>(token);
	// 		setMyId(tokenData.id);

	// 		setSocket(io('http://192.168.100.4:5000').emit('logged-in', tokenData.id));

	// 		$api.get(`http://192.168.100.4:5000/messages/getLastMessages`, {params: { myId: tokenData.id }})
	// 		.then((response) => {
	// 			setChatLastMessages(response.data);
				
	// 		})
	// 		.catch(() => console.log("Ошибка при загрузке lastMessage"));
	// 	})
	// 	.catch(() => console.log('Ошибка при чтении токена'));
	// }, [])

	useEffect(() => {
		setSocket(io(`${mobileURI}`).emit('logged-in', user._id));

		$api.get(`${mobileURI}/messages/getLastMessages`, {params: { myId: user._id }})
			.then((response) => {
				console.log(response.data);
				setChatLastMessages(response.data);
			})
			.catch(() => console.log("Ошибка при загрузке lastMessage"));
	}, [])

	
	useEffect(() => {
		socket?.on('updateMessages', () => {
			console.log('updateMessage client');
	
			$api.get(`${mobileURI}/messages/getLastMessages`, {params: { myId: user._id }})
				.then((response) => {
					setChatLastMessages(response.data);
				})
				.catch(() => console.log("Ошибка при загрузке lastMessage"));
		})

		return () => {
			socket?.off('WELCOME_FROM_SERVER');
		 };
	}, [socket])

	return (
		<ImageBackground style={{width: '100%', height: '100%'}} source={Background}>
			<View style={{flex: 1}}>
				<View style={styles.messagesContainer}>
					<FlatList
						extraData={chatLastMessages}
						data={chatLastMessages}
						//renderItem={({ item }) => <ChatListItem chatRoom={ item } id={ myId } socket={ socket } setChatLastMessages={setChatLastMessages}/>}
						renderItem={({ item }) => <ChatListItem chatRoom={ item } id={ user._id } socket={ socket }/>}
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