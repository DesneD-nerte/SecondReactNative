import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from 'react-native-elements';

export default function InputBox() {
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <View style={styles.inputMessageContainer}>
                <Input value={message} onChangeText={text => setMessage(text)} onSubmitEditing={enterMessage} placeholder='Напишите сообщение'></Input>
            </View>
            <View style={styles.enterMessageContainer}>
                <Button title={"Send"} style={styles.enterMessage} title="Send" onPress={enterMessage}></Button>
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },

	messagesContainer:{
		flex: 8,
		backgroundColor: 'pink'
	},

	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1
	},

	inputMessage: {
		flex: 2
	},

	enterMessage: {
		
	}
})