import {useEffect, useContext} from "react";
import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native-elements";
import MyProfileScreen from "../screens/MyProfileScreen";
import LoginScreen from "./LoginScreen";
import { TokenContext } from "../context/tokenContext";

const Stack = new createNativeStackNavigator();

const AcademicPerformanceScreen = ({ navigation, route }) => {

    return(
        <LoginScreen/>
    )
}

export default AcademicPerformanceScreen;


