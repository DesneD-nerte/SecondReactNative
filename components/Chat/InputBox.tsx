import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { io } from 'socket.io-client';
import { Icon } from 'react-native-elements';
import { Message } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { executeGetMessages } from '../../services/Messages';

function InputBox({ socket, setChatMessages, setChatLastMessages, params }) {

	const user = useSelector((state) => ({...state.profileData}))

	const [text, setText] = useState('');
	

	useEffect(() => {
		socket?.on('updateMessages', () => {
			console.log('updateMessage INPUTBOX');

			const {myId, myName, id, name} = params;
			executeGetMessages(setChatMessages, myId, myName, id, name);
		})
	}, [])

	const enterMessage = () => {
		if(text === null || text.match(/^ *$/) !== null) {
			alert("Введите корректное сообщение");
			return;
		}
		const fixedMessage = text.trim();
		if(fixedMessage) {
			setText('');
		}
		
		const message: Message = {
			content: fixedMessage,
			createdAt: new Date(),
			user: user
		}

		const receiverId = params.id;
		console.log(message, receiverId);
		socket.emit('sendMessage', { message, receiverId });

	}

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
						maxLength={140}
                        placeholder='Напишите сообщение'
                        style={styles.inputMessage} 
                        value={text} 
                        onChangeText={text => setText(text)} 
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
		marginRight: 10,
		minHeight: 35,
		flex: 1
	},

	inputMessage: {
		flex: 1,
		fontSize: 16,
		paddingLeft: 5,
	},

	enterMessageContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},

	enterMessage: {
		flexDirection: 'row',
		height: 30,
		alignItems: 'center',
		marginRight: 10
	}
})