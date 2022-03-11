import React from'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { ChatRoom, Message, User } from '../../types';
import moment from 'moment';

moment.locale('ru');

type ChatListItemProps = {
	id: String,
	chatRoom: ChatRoom
}

const ChatListItem = (props: ChatListItemProps) => {
	const { id, chatRoom } = props;
	
	const me: User = chatRoom.users.find(user => user._id === id);
	const user: User = chatRoom.users.find(user => user._id !== id);
	
	const imageUri = user.imageUri.replace('localhost', '192.168.100.4');

	const dateLastMessage = moment(chatRoom.lastMessage.createdAt).format('L'); 

	const navigation = useNavigation();

	const onClick = () => {
		navigation.navigate('ChatRoomScreen', {
			myId: me._id,
			myName: me.name,
			
			id: user._id,
			name: user.name,

			roomId: chatRoom._id
		});
	}

	return (
		<TouchableOpacity onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Avatar size={54} rounded source={imageUri ? { uri: imageUri } : {}}></Avatar>
					<View style={styles.midContainer}>
						<Text numberOfLines={1} style={styles.username}>{user.name}</Text>
						<Text numberOfLines={1} style={styles.textMessage}>{chatRoom.lastMessage.content}</Text>
					</View>
				</View>

				<View style={styles.rightContainer}>
					<Text>{dateLastMessage}</Text>
					{/* <Text>{chatRoom.lastMessage.createdAt}</Text> */}
					<View style={styles.countContainer}>
						<Text style={{color: 'white'}}>{'1'}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default ChatListItem;


const styles = StyleSheet.create({
    container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		width: '100%',
		padding: 10,
		borderTopWidth: 1,
		borderColor: 'lightgray'
	},
	
	leftContainer: {
		flexDirection: 'row', 
		flex: 1//!!
	},

	midContainer: {
		flexDirection: 'column',
		flex: 1,
		paddingLeft: 10,
		justifyContent: 'space-around',
		width: '100%'
	},

	username: {
		fontWeight: 'bold',
		fontSize: 16
	},

	textMessage: {
		width: '100%'
	},

	rightContainer: {
		flexDirection: 'column',
		alignItems: 'flex-end',
		justifyContent: 'space-around',
		paddingLeft: 15
	}, 

	countContainer: {
		alignSelf: 'center',
		alignItems:'center',
		backgroundColor:'#0086EA',
		borderRadius: 10,
		width: 40,
		height: 20
	}
})