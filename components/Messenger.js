import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { io } from 'socket.io-client';
import { Input } from "react-native-elements/dist/input/Input";
import { Button, Icon } from 'react-native-elements';
import Background from '../assets/BlackBackground.jpg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Messenger = () => {

	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState(['hello', '3453']);
	const [socket, setSocket] = useState();

	useEffect(() => {
		setSocket(io('http://192.168.100.4:5000'));
		console.log('socket connected');
		
		//socket.on('chat message', (msg) => console.log(msg));

		return (() => {
			console.log('Disconnecting socket...');
  			if(socket) {
				socket.disconnect();
			}
		})
	}, [])

	const enterMessage = () => {
		if(message === null || message.match(/^ *$/) !== null) {
			alert("Введите корректное сообщение");
			return;
		}

		const fixedMessage = message.trim();
		setChatMessages([...chatMessages, fixedMessage]);
		socket.emit("chat message", fixedMessage);

		setMessage('');
	}

	return (
		<ImageBackground style={{width: '100%', height: '100%'}} source={Background}>
			<View style={styles.messagesContainer}>

			</View>

			<View style={styles.mainContainer}>
				<View style={styles.inputContainer}>
					<View style={styles.inputMessageContainer}>
						<TouchableOpacity>
							<Icon 
								type='evilicon'
								name='plus'
								size={35}
								color='gray'>
							</Icon>
						</TouchableOpacity>
						<TextInput 
							multiline
							placeholder='Напишите сообщение'
							style={styles.inputMessage} 
							value={message} 
							onChangeText={text => setMessage(text)} 
							onSubmitEditing={enterMessage} 
						></TextInput>
					</View>
					<View style={styles.enterMessageContainer}>
						{/* <Button 
							type='clear'
							icon={{
								name: 'rightcircleo',
								type: 'antdesign',
								size: 20,
								color: "#0086EA"
							}}
							style={styles.enterMessage} 
							onPress={enterMessage}></Button> */}
							<TouchableOpacity onPress={enterMessage} style={styles.enterMessage}>
								<Icon 
									type='antdesign'
									name='rightcircleo'
									size={25}
									color="#0086EA">
								</Icon>
							</TouchableOpacity>
					</View>
				</View>
			</View>
		</ImageBackground>
	)
}

export default Messenger;


const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		flex: 1
	},

	inputContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingLeft: 5,
		paddingRight: 0,
		flex: 1,
	},

	inputMessageContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginRight: 20,
		minHeight: 35,
		flex: 1
	},

	inputMessage: {
		fontSize: 16,
		paddingLeft: 5,
		minWidth: "100%"
	},

	enterMessageContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingLeft: 10
	},

	enterMessage: {
		flexDirection: 'row',
		height: 30,
		alignItems: 'center',
		marginHorizontal: 10
	}
})