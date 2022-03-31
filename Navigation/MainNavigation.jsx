import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsScreen from "../screens/NewsScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import MessengerScreen from "../screens/MessengerScreen";
import AcademicPerformanceScreen from "../screens/AcademicPerformanceScreen";
import { Button, Input } from "react-native-elements";
import { TextInput, View } from "react-native";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {    

    return (
        <Tab.Navigator initialRouteName= "Home"
            screenOptions={({navigation, route}) => ({
                // headerShown: true,
                headerRight: () => (
                <Button  
                    title={"Settings"}
                    type="clear"
                    onPress={() => {
                        navigation.navigate('Settings');
                    }}>
                </Button>
                ),
                //headerRightContainerStyle: {marginRight: 10}
        })}>
            <Tab.Screen
                name="Home"
                component={ScheduleScreen}
                options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name='home' color={color} size={size} />
                            )
                        }}>
            </Tab.Screen>
            <Tab.Screen
                name="News"
                component={NewsScreen}
                options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="newspaper" color={color} size={size} />
                            )
                        }}>
            </Tab.Screen>
            <Tab.Screen
                name="Chat"
                component={MessengerScreen}
                options={({navigation, route}) => ({
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="message-reply-text" color={color} size={size} />
                            ),
                        })}>
            </Tab.Screen>
            <Tab.Screen
                name="Performance"
                component={AcademicPerformanceScreen}
                options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="notebook" color={color} size={size} />
                            )
                        }}>
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default MainNavigation;