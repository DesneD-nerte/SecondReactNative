import { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfileScreen from "./MyProfileScreen";
import Messenger from "../components/Messenger";
import { TokenContext } from "../context/tokenContext";
import NavigationService from "../services/NavigationService";


const Stack = new createNativeStackNavigator();
  
const MessengerScreen = ({ navigation, route }) => {
    
    const {isAuth, setIsAuth} = useContext(TokenContext);

    useEffect(() => {
        NavigationService.logOut(route, setIsAuth);
      }, [route.params?.logOut]);
    
    return(
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Messenger"
                component={Messenger}/>
            <Stack.Screen name="Settings"
                component={MyProfileScreen}
                />
        </Stack.Navigator>
    )
}

export default MessengerScreen;


