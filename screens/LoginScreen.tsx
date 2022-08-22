import { useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, ScrollView, Text, Dimensions} from 'react-native';
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { Icon } from 'react-native-elements'
import Background from '../assets/DistantMoon.jpg';
import { loginHttpPostData } from "../services/LoginService";
import { loadProfile } from "../store/slices/profileSlice";

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isErrorLogin, setIsErrorLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [ stateAuth, authActions ] = useContext(AuthContext);

    const handlePasswordChangeClick = () => {
        setShowPassword(!showPassword);
    }
    const loginEnter = () => {
        loginHttpPostData(username, password)
        .then(async data => {
            const {storeData, response} = data;

            dispatch(loadProfile(storeData));

            authActions.signIn( response.data.token );
        })
        .catch(err => {
            setIsErrorLogin(true);
        })
    }
    
    return(
        <View>
            <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.scrollViewContentContainer} style={styles.scrollViewItem}>
                <View style={styles.loginHeader}>
                    <Icon
                        name='user'
                        type='antdesign'
                        color='#5387E7'
                        size={35}
                        raised
                    />
                    <Text style={styles.loginHeader_Text}>
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
                            secureTextEntry={showPassword === false ? true : false} 
                            value={password}
                            onChangeText={password => setPassword(password)}
                            onSubmitEditing={loginEnter}
                            errorMessage={isErrorLogin === true && "Некорректный ввод логина или пароля"}
                            errorStyle={{color: 'red'}}
                            leftIcon={{ type: 'evilcons', name: 'lock', size: 20, color: "gray" }}
                            rightIcon={{ type: 'ionicon', name: showPassword === false ? 'eye' : 'eye-off', size: 25, color: "gray", onPress: handlePasswordChangeClick }}>
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
        height: 500
    },
    scrollViewItem: {
        backgroundColor: '#00000000'
    },
    loginHeader: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginHeader_Text: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
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