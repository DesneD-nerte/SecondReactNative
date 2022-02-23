import { useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from "react-native-elements";
import { TokenContext } from "../context/tokenContext";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {isAuth, setIsAuth} = useContext(TokenContext);

    const loginEnter = async () => {
        await axios.post("http://192.168.100.4:5000/api/auth/login", {username: username, password: password})
        .then(async response => {
            console.log(response.data.token);
            setIsAuth(true);
            await AsyncStorage.setItem('token', token)
        })
        .catch(err => console.log(err.message));
    }

    return(
        
        <View>
			<StatusBar style="auto" />
            <Input
				placeholder='username'
                autoFocus
                value={username}
				onChangeText={text => setUsername(text)}>
			</Input>
            <Input
				placeholder='password'
                autoFocus
                secureTextEntry={true} 
                value={password}
				onChangeText={password => setPassword(password)}>
			</Input>
            <Button title={"Log In"} onPress={loginEnter}></Button>
        </View>
    )
}

export default LoginScreen;