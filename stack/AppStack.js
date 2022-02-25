import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsScreen from "../screens/NewsScreen";
import HomeScreen from "../screens/HomeScreen";
import MessengerScreen from "../screens/MessengerScreen";
import AcademicPerformanceScreen from "../screens/AcademicPerformanceScreen";
import { Button } from "react-native-elements";
import ScreenHeaderRight from "../components/ScreenHeaderRight";

const Stack = new createNativeStackNavigator();
const Tab = new createBottomTabNavigator();

const AppStack = () => {    

    return (
        <Tab.Navigator initialRouteName= "Home"
            screenOptions={({navigation, route}) => ({
                headerRight: () => (
                <Button  
                    title={"Settings"}
                    type="clear"
                    onPress={() => {
                        navigation.navigate(route.name, {screen: 'Settings'});
                    }}>
                </Button>
                ),
                headerRightContainerStyle: {marginRight: 10}
            })}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="home" color={color} size={size} />
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
                options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="message-reply-text" color={color} size={size} />
                            )
                        }}>
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

export default AppStack