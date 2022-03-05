import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsScreen from "../screens/NewsScreen";
import { View } from "react-native";
import MessengerScreen from "../screens/MessengerScreen";
import AcademicPerformanceScreen from "../screens/AcademicPerformanceScreen";
import { Button } from "react-native-elements";
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
            >
            </Stack.Screen>
            <Stack.Screen
                name="UsersMessengerScreen"
                component={UsersMessengerScreen}
                options={{title: 'Contacts'}} 
            >
            </Stack.Screen>
            <Stack.Screen
                name="ChatRoomScreen"
                component={ChatRoomScreen} 
                options={({route}) => ({title: route.params.name})}
            >
            </Stack.Screen>
        </Stack.Navigator>



        // <Tab.Navigator initialRouteName= "Home"
        //     screenOptions={({navigation, route}) => ({
        //         headerRight: () => (
        //         <Button  
        //             title={"Settings"}
        //             type="clear"
        //             onPress={() => {
        //                 navigation.navigate(route.name, {screen: 'Settings'});
        //             }}>
        //         </Button>
        //         ),
        //         headerRightContainerStyle: {marginRight: 10}
        //     })}>
        //     <Tab.Screen
        //         name="Home"
        //         component={HomeScreen}
        //         options={{
        //                     tabBarIcon: ({ color, size }) => (
        //                         <MaterialCommunityIcons name="home" color={color} size={size} />
        //                     )
        //                 }}>
        //     </Tab.Screen>
        //     <Tab.Screen
        //         name="News"
        //         component={NewsScreen}
        //         options={{
        //                     tabBarIcon: ({ color, size }) => (
        //                         <MaterialCommunityIcons name="newspaper" color={color} size={size} />
        //                     )
        //                 }}>
        //     </Tab.Screen>
        //     <Tab.Screen
        //         name="Chat"
        //         component={MessengerScreen}
        //         options={{
        //                     tabBarIcon: ({ color, size }) => (
        //                         <MaterialCommunityIcons name="message-reply-text" color={color} size={size} />
        //                     )
        //                 }}>
        //     </Tab.Screen>
        //     <Tab.Screen
        //         name="Performance"
        //         component={AcademicPerformanceScreen}
        //         options={{
        //                     tabBarIcon: ({ color, size }) => (
        //                         <MaterialCommunityIcons name="notebook" color={color} size={size} />
        //                     )
        //                 }}>
        //     </Tab.Screen>
        // </Tab.Navigator>
        );
};

export default AppStack