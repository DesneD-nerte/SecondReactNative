import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import { mobileURI } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { getMyData } from "../services/LoginService";
import { loadProfile } from "../store/slices/profileSlice";

const MyProfileScreen = ({navigation, route}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [imageUri, setImageUri] = useState('');

	const myData = useSelector((state) => (state.profile));

    const dispatch = useDispatch();
    const [authState, authActions] = useContext(AuthContext);

    useEffect(() => {
        if(myData.imageUri) {
            const fixedImageUri = myData.imageUri.replace('http://localhost:5000', mobileURI);
            setImageUri(fixedImageUri);
        }

        setIsLoading(false);
    }, [myData])

    const logOut = async (event) => {   
        authActions.signOut();
    };

    const changeImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
        });

        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        result.name = filename;

        let bodyFormData = new FormData();
        bodyFormData.append('file', {
            uri: result.uri,
            type: 'image/jpeg',
            name: result.name
        });
        bodyFormData.append('id', myData._id);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${mobileURI}/upload`);
        xhr.setRequestHeader("Authorization", authState.token);
        xhr.send(bodyFormData);

        xhr.onreadystatechange = function() {
            getMyData(myData)
            .then(data => {
                dispatch(loadProfile(data));
            })
        }
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
                    <ScrollView style={styles.mainContainer}>
                        <View style={styles.avatarContainer}>
                            {imageUri
                                ?
                                <Avatar style={{ height: "100%", width: "100%" }} source={{uri: imageUri + '?' + new Date(), cache: 'reload'}}></Avatar>
                                :
                                <Avatar icon={{type:'font-awesome', name: 'user', color: 'black'}} size="large"></Avatar>
                            }
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.oneProperty}>
                                <Text style={styles.propertiesName}>Name:</Text>
                                <Text style={styles.propertiesValue}>{myData.name}</Text>
                            </View>
                            {
                                myData.faculties &&
                                <View style={styles.oneProperty}>
                                    <Text style={styles.propertiesName}>Faculty:</Text>
                                    <Text style={styles.propertiesValue}>
                                        {myData.faculties.map((item) => item.name + ' ')}
                                    </Text>
                                </View>
                            }
                            {
                                myData.departments &&
                                <View style={styles.oneProperty}>
                                    <Text style={styles.propertiesName}>Department:</Text>
                                    <Text style={styles.propertiesValue}>
                                        {myData.departments.map((item) => item.name + ' ')}
                                    </Text>
                                </View>
                            }
                            {
                                myData.groups &&
                                <View style={styles.oneProperty}>
                                    <Text style={styles.propertiesName}>Group:</Text>
                                    <Text style={styles.propertiesValue}>
                                        {myData.groups.map((item) => item.name + ' ')}
                                    </Text>
                                </View>
                            }
                            <View style={styles.oneProperty}>
                                <Text style={styles.propertiesName}>Login:</Text>
                                <Text style={styles.propertiesValue}>{myData.username}</Text>
                            </View>
                            <View style={[styles.oneProperty, styles.lastOneProperty]}>
                                <Text style={styles.propertiesName}>Status:</Text>
                                <Text style={styles.propertiesValue}>
                                    {myData.roles.map((item) => item.value + ' ')}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.betweenLine}></View>

                        <View style={styles.optionsContainer}>
                            <Text style={styles.textOptions}>
                                Настройки
                            </Text>
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
                                              
                    </ScrollView>
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
        flex: 1,
        minHeight: 175,
        backgroundColor: '#F3F3F3'
    },

    infoContainer: {
        marginLeft: 20,
    },

    oneProperty: {
        borderBottomWidth: 0.5,
        borderColor: 'lightgray',
        justifyContent: 'center',
        paddingVertical: 10
    },

    lastOneProperty: {
        borderBottomWidth: 0
    },

    propertiesName: {
        // color: '#c1c1c1',
        color: '#3396E2',
        fontSize: 15,
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
});
