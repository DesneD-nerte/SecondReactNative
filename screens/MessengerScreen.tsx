import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { io } from 'socket.io-client';
import { Button, Icon } from 'react-native-elements';
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

	const myData = useSelector((state) => ({...state.profileData}));

	const [chatLastMessages, setChatLastMessages] = useState<Array<ChatRoom>>([]);//Array не было
	const [showingChatLastMessages, setShowingChatLastMessages] = useState<Array<ChatRoom>>();
	//const [myId, setMyId] = useState('');
	const [socket, setSocket] = useState(null);
	//const [socket, setSocket] = useState(io(`${mobileURI}`).emit('logged-in', me._id));

	const [isVisibleSearchInput, setIsVisibleSearchInput] = useState(false);
	const [searchedUser, setSearcherUser] = useState('');
	
	useEffect(() => {
		setSocket(io(`${mobileURI}`).emit('logged-in', myData._id));

		$api.get(`${mobileURI}/messages/getLastMessages`, {params: { myId: myData._id }})
			.then((response) => {
				setChatLastMessages(response.data);
				setShowingChatLastMessages(response.data);
			})
			.catch(() => console.log("Ошибка при загрузке lastMessage"));
	}, [])

	
	useEffect(() => {
		socket?.on('updateMessages', () => {
			console.log('updateMessage client');
	
			$api.get(`${mobileURI}/messages/getLastMessages`, {params: { myId: myData._id }})
				.then((response) => {
					setChatLastMessages(response.data);
					setShowingChatLastMessages(response.data);
				})
				.catch(() => console.log("Ошибка при загрузке lastMessage"));
		})

		return () => {
			socket?.off('WELCOME_FROM_SERVER');
		 };
	}, [socket])

	useEffect(() => {
		if(searchedUser) {
			let arrayOfArguments = searchedUser.toLowerCase().split(' ');
			arrayOfArguments = arrayOfArguments.filter(argument => argument !== '');

			const croppedLastMessages = chatLastMessages.filter(item => {
				const userName = item.users.find(oneUser => {
					if(oneUser._id !== myData._id) {
						for (const oneElement of arrayOfArguments) {
							if(oneUser.name.toLowerCase().includes(oneElement)) {
								return true;
							}
						}
					} 
				});

				if(userName) {
					return true;
				} else {
					return false;
				} 
			})
			setShowingChatLastMessages(croppedLastMessages);
		}
		
	}, [searchedUser])

	useLayoutEffect(() => {
		if(isVisibleSearchInput) {
			navigation.setOptions({
				headerRight: () => (
					<View style={{ flexDirection: 'row', width: '100%', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
						<TextInput autoFocus={true} onChangeText={text => setSearcherUser(text) } placeholder="Поиск" style={{fontSize: 16, flex: 1}}></TextInput>
						<Button  
							icon={{type: 'ionicons', name: 'search', color: "#55ADFF"}}
							type="clear"
							onPress={() => {
								setIsVisibleSearchInput(false);
								setShowingChatLastMessages(chatLastMessages);
							}}>
						</Button>
					</View>
			)
			});
		} else {
			navigation.setOptions({
				headerRight: () => (
					<View style={{ flexDirection: 'row', width: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
						<Button  
							icon={{type: 'ionicons', name: 'search', color: "#55ADFF"}}
							type="clear"
							onPress={() => {
								setIsVisibleSearchInput(true);
							}}>
						</Button>
					</View>
			)
			});
		}
	  }, [isVisibleSearchInput]);

	return (
		<ImageBackground style={{width: '100%', height: '100%'}} source={Background}>
			<View style={{flex: 1}}>
				<View style={styles.messagesContainer}>
					<FlatList
						extraData={showingChatLastMessages}
						data={showingChatLastMessages}
						renderItem={({ item }) => <ChatListItem chatRoom={ item } id={ myData._id } socket={ socket }/>}
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
						onPress={() => navigation.navigate('UsersMessengerScreen', {socket: socket})}
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