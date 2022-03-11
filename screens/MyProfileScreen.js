import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Platform, PermissionsAndroid } from "react-native"
import { Avatar, Button, Icon } from "react-native-elements";
import axios from "axios";
import $api from '../http/index';
import { TokenContext } from "../context/tokenContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const MyProfileScreen = ({navigation, route}) => {
    const imageUrl = 'https://randomuser.me/api/portraits/men/36.jpg';

    const [isLoading, setIsLoading] = useState(true);
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [login, setLogin] = useState('');
    const [roles, setRoles] = useState([]);
    const [imageUri, setImageUri] = useState('');
    const {isAuth, setIsAuth} = useContext(TokenContext);

    useEffect(() => {
        $api.get(`http://192.168.100.4:5000/myprofile`)
        .then(response => {
                setNameAndSurname(response.data.name);
                setLogin(response.data.username);
                setRoles(response.data.roles);
                const fixedImageUri = response.data.imageUri.replace('localhost', '192.168.100.4');
                setImageUri(fixedImageUri);
                setIsLoading(false);
            })
        .catch((error) => console.log(error.message))
    }, [])

    const logOut = (event) => {   
        AsyncStorage.clear();
        setIsAuth(false);
    };

    // const changeImage = async () => {
    //     const result = await launchImageLibrary({mediaType: 'photo'})
    //     .catch(error => console.log(error));

    //     console.log(result.assets);
    // }

    const changeImage = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setFilePath(response);
        });
    };
    

    return (
        <View style={styles.profileContainer}>
            
            {isLoading 
                ? 
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>Загрузка</Text>
                        <ActivityIndicator size="large" color="#33a8ff"/>
                    </View>
                :
                    <View style={styles.mainContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar style={{ height: "100%", width: "100%" }} source={{uri: imageUri + '?' + new Date(), cache: 'reload'}}></Avatar>
                        </View>
                        
                        <View style={styles.infoContainer}>
                            <View style={styles.oneProperty}>
                                <Text style={styles.propertiesName}>Name:</Text>
                                <Text style={styles.propertiesValue}>{nameAndSurname}</Text>
                            </View>
                            <View style={styles.oneProperty}>
                                <Text style={styles.propertiesName}>Login:</Text>
                                <Text style={styles.propertiesValue}>{login}</Text>
                            </View>
                            <View style={styles.oneProperty}>
                                <Text style={styles.propertiesName}>Status:</Text>
                                <Text style={styles.propertiesValue}>{roles}</Text>
                            </View>
                        </View>

                        <View style={styles.betweenLine}></View>

                        <View style={styles.optionsContainer}>
                            <Text style={styles.textOptions}>Настройки</Text>
                                <TouchableOpacity style={styles.oneItemContainer} onPress={changeImage}>
                                        <Icon 
                                            type='Octicons'
                                            name='person'
                                            size={26}
                                            color="gray">
                                        </Icon>
                                    <View style={styles.oneItem}>
                                        <Text style={styles.textOneItem}>
                                            Изменить аватар
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.oneItemContainer} onPress={logOut}>
                                        <Icon 
                                            type='MaterialIcons'
                                            name='logout'
                                            size={26}
                                            color="gray">
                                        </Icon>
                                    <View style={styles.oneItem}>
                                        <Text style={styles.textOneItem}>
                                            Выход
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                        </View>  
                                              
                    </View>
                    
            }
           
        </View>
    )
}
export default MyProfileScreen;

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1
    },

    mainContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 1
    },

    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    infoContainer: {
        justifyContent: 'center',
        marginLeft: 20,
        marginBottom: 15,
    },

    oneProperty: {
        borderBottomWidth: 0.5,
        borderColor: 'lightgray'
    },
    
    propertiesName: {
        color: '#c1c1c1',
        fontSize: 15,
        marginTop: 10
    },

    propertiesValue: {
        color: 'black',
        fontSize: 16
    },

    loading: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingText: {
        fontSize: 16
    },

    betweenLine: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#E4E4E4',
        borderColor: '#8A8A8A2C',
        borderWidth: 0.2,
        marginHorizontal: -10,
        // flex: 0.05
        height: 8
    },

    optionsContainer: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 15,
        marginLeft: 20
    },

    textOptions: {
        color: '#0086EA',
        fontWeight: '700',
        fontSize: 16,
    },

    oneItemContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems:'center',
    },

    oneItem: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: "lightgray",
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginLeft: 20,
    },

    textOneItem: {
        fontSize: 16
    }
})

