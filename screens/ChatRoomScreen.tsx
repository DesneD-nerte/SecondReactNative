import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { View, FlatList, StyleSheet, ImageBackground, Button } from 'react-native'
import { Text } from 'react-native-elements'
import ChatMessage from '../components/Chat/ChatMessage'
import InputBox from '../components/Chat/InputBox'
import chatsRoomData from '../data/Chats'
import Background from '../assets/WhiteBackground.jpg';
import DateMessage from '../services/DateMessage';
import $api from '../http'
import Chats from '../data/Chats'
import { ChatType } from '../types';
import { useChat } from '../hooks/useChat'
import { executeGetMessages, getDirectMessages } from '../services/Messages'
import { useDispatch } from 'react-redux'
import { changeLastMessages } from '../store/messagesRecucer'
import { mobileURI } from '../config/config'


let currentDate = new Date('1970.01.01');
let previousDate = new Date('1970-01-01');

const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
	"Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
];

function ChatRoomScreen({route}) {

	const flatListRef = useRef<any>();

	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState<ChatType>();

	const {chatRoom} = route.params;

	useEffect(() => {
		const {myId, myName, id, name} = route.params;

		// executeGetMessages(setChatMessages, myId, myName, id, name);
		getDirectMessages(setChatMessages, chatRoom, myId, myName, id, name);
	}, [])

	useEffect(() => {
		setTimeout(() => {
			if(flatListRef.current !== undefined) {
				flatListRef.current.scrollToEnd();
			}
		}, 150);
	}, [chatMessages])

	return (
		<ImageBackground style={{width: '100%', height: '100%'}} source={Background}>
			<View style={styles.container}>
				{ 
					!chatMessages
					? 
						<View style={styles.loading}>
							<Text style={styles.loadingText}>Сообщений нет</Text>
						</View>
					:
						<FlatList extraData={chatMessages}
							// inverted
							data={[...chatMessages.messages]}
							// contentContainerStyle={{ flexDirection: 'column-reverse' }}
							renderItem={({ item, index }) => {
								currentDate = new Date(item.createdAt);
								// if(index === 0) previousDate = currentDate; 
								if(DateMessage.CheckDateMessage(currentDate, previousDate)) {
									// console.log('main if', item.content);
									// console.log('currentData:', currentDate, 'previousData', previousDate);
									previousDate = currentDate;
									const jsxToReturn =
										<View>
											<View style={{backgroundColor: 'rgba(163, 163, 163, 0.5)', borderRadius: 30, paddingHorizontal: 5, paddingVertical: 3, alignSelf: 'center'}}>
												<Text>{previousDate.getDate() + ' ' + monthNames[previousDate.getMonth()]}</Text>	
											</View>
											<ChatMessage message={item}></ChatMessage>
										</View>
									// previousDate = currentDate;
									return jsxToReturn;
								}
								// else {
								// 	console.log('else', item.content);
								// 	console.log('currentData:', currentDate, 'previousData', previousDate);
								// }
								return <ChatMessage message={item}></ChatMessage>
							}}
							keyExtractor={(item, index) => index.toString()}
							onLayout={() => {
								setTimeout(() => {
									flatListRef.current.scrollToEnd({ animated: true })
								}, 150);
							}}
							ref={flatListRef}
							>
						</FlatList>
				}
				<InputBox socket={route.params.socket} chatMessages={chatMessages} setChatMessages={setChatMessages} params={route.params}></InputBox>
			</View>
		</ImageBackground>
	)
}

export default ChatRoomScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	messageBox: {
		backgroundColor: '#DBDBDB'
	},

	loading: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        fontSize: 16
    },

})