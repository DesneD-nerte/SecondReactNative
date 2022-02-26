import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { io } from 'socket.io-client';
import { Icon } from 'react-native-elements';
import Background from '../assets/WhiteBackground.jpg';
import ChatListItem from './ChatListItem';
import ChatRooms from '../data/ChatRooms';

const Messenger = ({navigation}) => {

	return (
		<ImageBackground style={{width: '100%', height: '100%'}} source={Background}>
			<View style={{flex: 1}}>
				<View style={styles.messagesContainer}>
					<FlatList
						data={ChatRooms}
						renderItem={({ item }) => <ChatListItem chatRoom={item}/>}
					/>
					{/* <ChatListItem chatRoom={ChatRooms[0]}></ChatListItem> */}
				</View>

				<View style={styles.plusContainer}>
				<Icon
					reverse
					name='pencil-sharp'
					type='ionicon'
					color='#2CA5FF'
					// onPress={() => navigation.navigate('AddUser')}
					onPress={() => navigation.navigate('AddUser')}
					/>
				</View>

			</View>
		</ImageBackground>
	)
}

export default Messenger;


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