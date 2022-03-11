import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, FlatList, StyleSheet, ImageBackground, Button } from 'react-native'
import { Text } from 'react-native-elements'
import ChatMessage from '../components/Chat/ChatMessage'
import InputBox from '../components/Chat/InputBox'
import chatsRoomData from '../data/Chats'
import Background from '../assets/WhiteBackground.jpg';
import DateMessage from '../services/DateMessage';
import $api from '../http'
import Chats from '../data/Chats'
import { useChat } from '../hooks/useChat'

let currentDate = new Date('1970.01.01');
let previousDate = new Date('1970-01-01');

const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
	"Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
];

function ChatRoomScreen({route}) {

	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState(Chats);
	
	useEffect(() => {
		const {myId, myName, id, name} = route.params;

		console.log(myId, ' : ', myName, ' : ', id, ' : ', name,);

		$api.get(`http://192.168.100.4:5000/messages/getChatRoomMessages`, {params: { myId: myId, myName: myName, id: id, name: name}})
		.then((response) => {
			setChatMessages(response.data);
			console.log(response.data);
		})
		.catch(() => console.log("Ошибка загрузки"));
	}, [])

	return (
		<ImageBackground style={{width: '100%', height: '100%'}} source={Background}>
			<View style={styles.container}>
				{ 
					chatMessages[0].messages[0].content === 'tekwjti43o56pjormghopfnhmd' 
					? 
						<View style={styles.loading}>
							<Text style={styles.loadingText}>Сообщений нет</Text>
						</View>
					:
						<FlatList extraData={chatMessages[0]}
							data={chatMessages[0].messages}
							renderItem={({ item }) => {
								currentDate = new Date(item.createdAt);
								if(DateMessage.CheckDateMessage(currentDate, previousDate)) {
									previousDate = currentDate;
									return <View>
												<View style={{backgroundColor: 'rgba(163, 163, 163, 0.5)', borderRadius: 30, paddingHorizontal: 5, paddingVertical: 3, alignSelf: 'center'}}>
													<Text>{currentDate.getDate() + ' ' + monthNames[currentDate.getMonth()]}</Text>	
												</View>
												<ChatMessage message={item}></ChatMessage>
											</View>
								}
								return <ChatMessage message={item}></ChatMessage>
							}}
							keyExtractor={(item, index) => index.toString()}>
						</FlatList>
				}
				
				<InputBox ></InputBox>
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