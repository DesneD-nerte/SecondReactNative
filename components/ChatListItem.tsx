import React from'react'
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { ChatRoom, Message } from '../types';

type ChatListItemProps = {
	chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
	const { chatRoom } = props;
	
	const user = chatRoom.users[1];

	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Avatar size={54} rounded source={{ uri: user.imageUri}}></Avatar>
				<View style={styles.midContainer}>
					<Text style={styles.username}>{user.name}</Text>
					<Text numberOfLines={1} style={styles.textMessage}>{chatRoom.lastMessage.content}</Text>
				</View>
			</View>

			<View style={styles.rightContainer}>
				<Text>Yesterday</Text>
				{/* <Text>{chatRoom.lastMessage.createdAt}</Text> */}
				<View style={styles.countContainer}>
					<Text style={{color: 'white'}}>{'1'}</Text>
				</View>
			</View>
		</View>
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
		borderBottomWidth: 0.2,
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
		justifyContent: 'space-between'
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