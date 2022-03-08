import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { io } from 'socket.io-client';
import { Icon } from 'react-native-elements';
import { useChat } from '../hooks/useChat';

function InputBox({sendMessage}) {

    //#region Socket.IO
	const [message, setMessage] = useState('');
	const [] = useChat()
	//const [socket, setSocket] = useState();

	// useEffect(() => {
	// 	setSocket(io('http://192.168.100.4:5000'));
	// 	console.log('socket connected');

	// 	return (() => {
	// 		console.log('Disconnecting socket...');
  	// 		if(socket) {
	// 			socket.disconnect();
	// 		}
	// 	})
	// }, [])

	const enterMessage = () => {
		// if(message === null || message.match(/^ *$/) !== null) {
		// 	alert("Введите корректное сообщение");
		// 	return;
		// }
		
		const fixedMessage = message.trim();
		if(fixedMessage) {
			sendMessage({message: message});
			setMessage('');
		}
		// setChatMessages([...chatMessages, fixedMessage]);
		// socket.emit("chat message", fixedMessage);
	}
	//#endregion

    return (
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
    )
}

export default InputBox;

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',

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