import { createRef, useContext, useEffect, useRef, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Image, ImageBackground, KeyboardAvoidingView, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from "react-native-elements";
import { TokenContext } from "../context/tokenContext";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { changeProfileData } from "../store/profileDataReducer";
import { mobileURI } from "../config/config";
import { Icon } from 'react-native-elements'
import Background from '../assets/DistantMoon.jpg';

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {isAuth, setIsAuth} = useContext(TokenContext);
    const [isErrorLogin, setIsErrorLogin] = useState(false);

    const loginEnter = () => {
        axios.post(`${mobileURI}/api/auth/login`, {username: username, password: password})
        .then(async response => {
            
            setIsAuth(true);
            
            const {_id, username, name, roles, email, imageUri, faculties, departments, groups} = response.data;
            const storeData = {_id, username, name, roles, email, imageUri, faculties, departments, groups};
            
            dispatch(changeProfileData(storeData));

            await AsyncStorage.setItem('token', response.data.token);
        })
        .catch(err => {
            setIsErrorLogin(true);
        });
    }
    
    return(
        <View>
            <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.scrollViewContentContainer} style={styles.scrollViewItem}>
                <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon
                        name='user'
                        type='antdesign'
                        color='#5387E7'
                        size={35}
                        raised
                    />
                    <Text style={{textAlign: 'center', fontSize: 25, color: 'white' }}>
                        Login
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
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
                            onSubmitEditing={loginEnter}
                            errorMessage={isErrorLogin === true && "Некорректный ввод логина или пароля"}
                            errorStyle={{color: 'red'}}
                            leftIcon={{ type: 'evilcons', name: 'lock', size: 20, color: "gray"  }}>
                        </Input>
                        <Button title={"Log In"} containerStyle={styles.buttonContainer} onPress={loginEnter}></Button>
                    </View>
                </View>
            </ScrollView>
            <ImageBackground style={styles.image} blurRadius={5} source={Background}/>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    scrollViewContentContainer: {
        height: '100%'
    },
    scrollViewItem: {
        backgroundColor: '#00000000'
    },
    mainContainer: {
        flex: 1,
        // justifyContent: 'center',
        height: '100%'
    },
    container: {
        borderWidth: 1,
        borderColor: 'lightgray',

        shadowColor: 'black',
        elevation: 10,

        padding: 15,
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 15
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    buttonContainer: {
        width: '40%',
        marginTop: 3,
        alignSelf: 'center'
    },
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})