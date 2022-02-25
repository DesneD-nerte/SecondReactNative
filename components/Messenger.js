import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { io } from 'socket.io-client';

const Messenger = () => {

	useEffect(() => {
		this.socket = io('http://192.168.100.4:5000');
	}, [])

	return (
		<View>
			<Text>
				Hello
			</Text>
		</View>
	)
}

export default Messenger;
