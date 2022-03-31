import React, { useEffect } from'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { ChatRoom, ChatType, Message, User } from '../../types';
import { mobileURI } from '../../config/config';

type ChatListItemProps = {
	me: User;
	user: User;
	//id: String,
	//chatRoom: ChatRoom,
	socket: any,
}

function UsersMessangerItem(props: ChatListItemProps) {
	//const { id, chatRoom } = props;
	
	//const me: User = chatRoom.users.find(user => user._id === id);
	//const user: User = chatRoom.users.find(user => user._id !== id);

	const me = props.me;
	const user = props.user;

	const imageUri = user.imageUri?.replace('http://localhost:5000', mobileURI);
	let titleAvatarArray = user.name.split(' ', 2);
	const titleAvatar = titleAvatarArray.map(oneName => oneName.charAt(0)).join('');

	const navigation = useNavigation();

	const chatRoom: ChatType = {
		users: [me, user],
		messages: []
	}

	const onClick = () => {
		// navigation.dispatch(
		// 	CommonActions.reset({
		// 		index: 1,
		// 		routes: [
		// 			{
		// 				name: 'Chat',
		// 			}
		// 		],
		// 	})
		// );

		// navigation.navigate('ChatRoomScreen', {
		// 	id: user.id,
		// 	name: user.name
		// });

		navigation.navigate('ChatRoomScreen', {
			myId: me._id,
			myName: me.name,
			
			id: user._id,
			name: user.name,

			chatRoom: chatRoom,

			socket: props.socket
		});
	}

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					{imageUri 
						?
						<Avatar size={54} rounded source={imageUri ? { uri: imageUri } : {}} ></Avatar>
						:
						<Avatar size={54} rounded title={titleAvatar} titleStyle={{color: 'white'}} containerStyle={{backgroundColor: '#52B4FF'}}></Avatar>
					}
					<View style={styles.midContainer}>
						<Text style={styles.username}>{user.name}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default UsersMessangerItem


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