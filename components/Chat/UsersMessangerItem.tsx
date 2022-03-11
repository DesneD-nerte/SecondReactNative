import React from'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { ChatRoom, Message, User } from '../../types';

type ChatListItemProps = {
	chatRoom: ChatRoom;
}

function UsersMessangerItem(props: ChatListItemProps) {

	const { chatRoom } = props; 

	const user: User = chatRoom.users[1];

	const navigation = useNavigation();

	const onClick = () => {
		navigation.navigate('ChatRoomScreen', {
			id: user.id,
			name: user.name
		});
	}

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Avatar size={54} rounded source={{ uri: user.imageUri}}></Avatar>
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