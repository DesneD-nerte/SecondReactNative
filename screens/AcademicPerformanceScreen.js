import {useEffect, useContext} from "react";
import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native-elements";
import MyProfileScreen from "../screens/MyProfileScreen";
import LoginScreen from "./LoginScreen";
import { TokenContext } from "../context/tokenContext";
import NavigationService from "../services/NavigationService";

const Stack = new createNativeStackNavigator();

const AcademicPerformanceScreen = ({ navigation, route }) => {

    const {isAuth, setIsAuth} = useContext(TokenContext);

    useEffect(() => {
        NavigationService.logOut(route, setIsAuth);
      }, [route.params?.logOut]);

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

export default AcademicPerformanceScreen;


