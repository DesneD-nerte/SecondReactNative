import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { Avatar, Button } from "react-native-elements";
import axios from "axios";
import $api from '../http/index';
import NavigationService from "../services/NavigationService";

const MyProfileScreen = ({navigation, route}) => {
    const imageUrl = 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg';

    const [isLoading, setIsLoading] = useState(true);
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [login, setLogin] = useState('');
    const [roles, setRoles] = useState([]);


    useEffect(() => {
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

    const logOut = (event) => {
        const routeName = NavigationService.getParentRoute(navigation);

        //console.log(routeName);
        navigation.navigate({
            name: routeName,
            params: { logOut: true},
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
                        <View style={styles.logoutContainer}>
                            <Button title={"Logout"} type='outline' buttonStyle={{borderWidth: 1}} onPress={logOut}></Button>
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
        margin: 5,
        flex: 1
    },

    mainContainer: {
        flexDirection: 'column',
        margin: 5,
        flex: 1
    },

    avatarContainer: {
        alignItems: 'center',
        flex: 1
    },

    infoContainer: {
        alignItems: 'flex-start',
        flex: 2
    },

    propertiesName: {
        color: '#c1c1c1',
        fontSize: 18,
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

    logoutContainer: {
        alignItems: 'center',
    }
})

