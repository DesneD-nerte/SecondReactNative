import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native"
import { Avatar } from "react-native-elements";
import axios from "axios";
import $api from '../http/index';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyProfileScreen = ({navigation}) => {
    const imageUrl = 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg';
    
    const [isLoading, setIsLoading] = useState(true);
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [login, setLogin] = useState('');
    const [roles, setRoles] = useState([]);


    useEffect(async() => {
        //instanceAxios.get(`http://192.168.100.4:5000/myprofile`)
        //instanceAxios.get(`http://10.0.2.2:5000/myprofile`)
        $api.get(`http://192.168.100.4:5000/myprofile`)
        .then(response => {
                setNameAndSurname(response.data.name);
                setLogin(response.data.username);
                setRoles(response.data.roles);
                setIsLoading(false);
            })
        .catch((error) => console.log(error.message))
    }, [])


    return (
        <View style={styles.profileContainer}>
            
            {isLoading 
                ? 
                    <View className='loading'>
                        <Text>
                            ЗАГРУЗКА...
                        </Text>
                    </View>
                :
                    <View style={styles.mainContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar size={150} rounded source={{uri: imageUrl}}></Avatar>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.propertiesName}>Name:</Text>
                            <Text style={styles.propertiesValue}>{nameAndSurname}</Text>

                            <Text style={styles.propertiesName}>Login:</Text>
                            <Text style={styles.propertiesValue}>{login}</Text>
                            
                            <Text style={styles.propertiesName}>Status:</Text>
                            <Text style={styles.propertiesValue}>{roles}</Text>
                        </View>
                    </View>
            }
        </View>
    )
}
export default MyProfileScreen;

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        alignSelf: 'stretch',
        margin: 5,
        flex: 1
    },

    mainContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        margin: 5,
        flex: 1
    },

    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    infoContainer: {
        alignItems: 'flex-start',
        flex: 2
    },

    propertiesName: {
        color: '#c1c1c1',
        fontSize: 18,
        marginTop: 15
    },

    propertiesValue: {
        color: 'black',
        fontSize: 16
    }
})

