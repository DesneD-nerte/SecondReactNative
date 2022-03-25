import { useContext, useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from "react-native-elements";
import { TokenContext } from "../context/tokenContext";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { changeProfileData } from "../store/profileDataReducer";
import { mobileURI } from "../config/config";

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {isAuth, setIsAuth} = useContext(TokenContext);

    const loginEnter = async () => {
        await axios.post(`${mobileURI}/api/auth/login`, {username: username, password: password})
        .then(async response => {
            
            setIsAuth(true);
            
            const {_id, username, name, roles, email, imageUri} = response.data;
            const storeData = {_id, username, name, roles, email, imageUri};
            
            dispatch(changeProfileData(storeData));

            await AsyncStorage.setItem('token', response.data.token);
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
				onChangeText={text => setUsername(text)}
                leftIcon={{ type: 'font-awesome', name: 'user', size: 20, color: "gray" }}>
			</Input>
            <Input
				placeholder='password'
                secureTextEntry={true} 
                value={password}
				onChangeText={password => setPassword(password)}
                leftIcon={{ type: 'evilcons', name: 'lock', size: 20, color: "gray"  }}>
			</Input>
            <Button title={"Log In"} onPress={loginEnter}></Button>
        </View>
    )
}

export default LoginScreen;