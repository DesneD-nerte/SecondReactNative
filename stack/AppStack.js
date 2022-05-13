import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigation from "../Navigation/MainNavigation";
import MyProfileScreen from "../screens/MyProfileScreen";
import { UsersMessengerScreen } from "../screens/UsersMessengerScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";

const Stack = new createNativeStackNavigator();
const Tab = new createBottomTabNavigator();

const AppStack = () => {    
    return (
        <Stack.Navigator screenOptions={{
                headerShown: true
            }}>
            <Stack.Screen
                name="Root"
                options={{headerShown: false}}
                component={MainNavigation}
            >
            </Stack.Screen>
            <Stack.Screen
                name="Settings"
                component={MyProfileScreen} 
                options={{title: "Настройки"}}
            >
            </Stack.Screen>
            <Stack.Screen
                name="UsersMessengerScreen"
                component={UsersMessengerScreen}
                options={{title: 'Контакты'}} 
            >
            </Stack.Screen>
            <Stack.Screen
                name="ChatRoomScreen"
                component={ChatRoomScreen} 
                options={({route}) => ({title: route.params.name})}
            >
            </Stack.Screen>
        </Stack.Navigator>
        );
};

export default AppStack