import { useEffect, useState, useContext } from "react";
import { Button, FlatList, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfileScreen from "../screens/MyProfileScreen";
import Scheduler from "../components/Scheduler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import mainLogo from '../assets/favicon.png';
import { Agenda } from 'react-native-calendars';
import { Avatar, Divider, Input } from "react-native-elements";
import { TokenContext } from "../context/tokenContext";
import NavigationService from "../services/NavigationService";

const Stack = new createNativeStackNavigator();

const HomeScreen = ({ navigation, route }) => {

    const {isAuth, setIsAuth} = useContext(TokenContext);

    useEffect(() => {
        NavigationService.logOut(route, setIsAuth);
      }, [route.params?.logOut]);
    

    return (
        <Stack.Navigator initialRouteName= "Scheduler"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Scheduler"
                    component={Scheduler}/>
                <Stack.Screen name="Settings"
                    component={MyProfileScreen}/>
        </Stack.Navigator>
    )
};

export default HomeScreen;
