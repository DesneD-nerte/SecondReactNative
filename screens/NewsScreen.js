import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native-elements";
import MyProfileScreen from "../screens/MyProfileScreen";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import React from "react";

const Stack = new createNativeStackNavigator();


const NewsScreen = ({ navigation }) => {

    return(
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="News"
                component={LoginScreen}/>
            <Stack.Screen name="Settings"
                component={MyProfileScreen}
                />
        </Stack.Navigator>
    )
}

export default NewsScreen;


