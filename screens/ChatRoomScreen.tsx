import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { View, FlatList, StyleSheet, ImageBackground, Button } from 'react-native'
import { Text } from 'react-native-elements'
import ChatMessage from '../components/Chat/ChatMessage'
import InputBox from '../components/Chat/InputBox'
import chatsRoomData from '../data/Chats'
import Background from '../assets/WhiteBackground.jpg';
import DateMessage from '../services/DateMessage';
import $api from '../http'
import Chats from '../data/Chats'
import { ChatType, Message } from '../types';
import { useChat } from '../hooks/useChat'
import { executeGetMessages, getDirectMessages } from '../services/Messages'
import { useDispatch } from 'react-redux'
import { changeLastMessages } from '../store/messagesRecucer'
import { mobileURI } from '../config/config'

var _ = require('lodash');

let currentDate = new Date('1970.01.01');
let previousDate = new Date('1970-01-01');

const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
	"Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
];

function ChatRoomScreen({route}) {

	const flatListRef = useRef<any>();

	const countSkipMessages = useRef<number>(0);
	// let countSkipMessages: number = 0;

	const [chatMessages, setChatMessages] = useState<ChatType>();
	const [dataIsReady, setDataIsReady] = useState(false);
	const [newChatMessages, setNewChatMessages] = useState<ChatType>();
	const [refreshing, setRefreshing] = useState(false);
	const {chatRoom} = route.params;

	useEffect(() => {
		const {myId, myName, id, name} = route.params;

		getDirectMessages(setChatMessages, chatRoom, myId, id, countSkipMessages.current);

		return(() => {
			$api.get(`${mobileURI}/messages/getChatRoomMessages`, {params: { myId: myId, id: id, skip: 0}})
			.then((response) => {
				$api.put(`${mobileURI}/messages/updateVisibleAllMessages`, {chatMessages: response.data, id, myId});
			})
		})
	}, [])

	useEffect(() => {
		let isMounted = true;
		if(dataIsReady === false) {
			const {myId, id} = route.params;
			countSkipMessages.current += 20;

			$api.get(`${mobileURI}/messages/getChatRoomMessages`, {params: { myId: myId, id: id, skip: countSkipMessages.current}})
			.then((response) => {
				setNewChatMessages(response.data);
				setDataIsReady(true);
			})
		}

		return () => { isMounted = false}
	}, [dataIsReady])


	const viewabilityConfig = {
		waitForInteraction: true,
		// At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
		viewAreaCoveragePercentThreshold: 100,
		// itemVisiblePercentThreshold: 100
	}
	
	const onViewableItemsChanged = ({viewableItems, changed}) => {
		//console.log("Visible items are", viewableItems);
		//console.log("Changed in this iteration", changed);
		// const changedMessages = viewableItems ;
		// console.log(changed);
		// if(oneMessage.isVisible === false) {
		// 	$api.put(`${mobileURI}/messages/updateVisibleMessage`, {chatMessages, oneMessage});
		// }
		// if(chatRoom) {
		// 	const {id} = chatRoom;
		// 	$api.put(`${mobileURI}/messages/updateVisibleAllMessages`, {chatMessages, id}); 
		// }
		let isMounted = true;
		const items = viewableItems;

		if(items.some(oneItem => oneItem.index === 0)) {
			setDataIsReady((oldDataIsReady) => {
				if(oldDataIsReady === true) {
					setNewChatMessages((accessNewChatMessages) => {
						if(accessNewChatMessages) {
							setChatMessages((oldChatMessages) => {
								oldChatMessages.messages.unshift(...accessNewChatMessages.messages)							
								return oldChatMessages;
							})
						}

						return accessNewChatMessages;
					});

					return false;
				}
			})
		}

		return () => { isMounted = false };
	};
	const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

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
							viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
							renderItem={({ item, index }) => {
								currentDate = new Date(item.createdAt);

								if(DateMessage.CheckDateMessage(currentDate, previousDate)) {//один и тот же день
									previousDate = currentDate;
									const jsxToReturn =
										<View>
											<View style={{backgroundColor: 'rgba(163, 163, 163, 0.5)', borderRadius: 30, paddingHorizontal: 5, paddingVertical: 3, alignSelf: 'center'}}>
												<Text>{previousDate.getDate() + ' ' + monthNames[previousDate.getMonth()]}</Text>	
											</View>
											<ChatMessage message={item}></ChatMessage>
										</View>
									return jsxToReturn;
								} 
								if(index === 0) {
									const jsxToReturn =
										<View>
											<View style={{backgroundColor: 'rgba(163, 163, 163, 0.5)', borderRadius: 30, paddingHorizontal: 5, paddingVertical: 3, alignSelf: 'center'}}>
												<Text>{previousDate.getDate() + ' ' + monthNames[previousDate.getMonth()]}</Text>	
											</View>
											<ChatMessage message={item}></ChatMessage>
										</View>
									return jsxToReturn;
								}
								return <ChatMessage message={item}></ChatMessage>
							}}
							keyExtractor={(item) => item._id.toString()}
							onLayout={() => {
								setTimeout(() => {
									flatListRef.current.scrollToEnd({ animated: true })
								}, 1000);
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