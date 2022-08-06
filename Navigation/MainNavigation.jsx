import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NewsScreen from "../screens/NewsScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import MessengerScreen from "../screens/MessengerScreen";
import AcademicPerformanceScreen from "../screens/AcademicPerformanceScreen";
import { Button } from "react-native-elements";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ navigation, route }) => ({
                headerRight: () => (
                    <Button
                        name={"Settings"}
                        title={"Настройки"}
                        type="clear"
                        onPress={() => {
                            navigation.navigate("Settings");
                        }}
                    ></Button>
                ),
            })}
        >
            <Tab.Screen
                name="Home"
                component={ScheduleScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    title: "Расписание",
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="News"
                component={NewsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="newspaper"
                            color={color}
                            size={size}
                        />
                    ),
                    title: "Новости",
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Chat"
                component={MessengerScreen}
                options={({ navigation, route }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="message-reply-text"
                            color={color}
                            size={size}
                        />
                    ),
                    title: "Мессенджер",
                })}
            ></Tab.Screen>
            <Tab.Screen
                name="Performance"
                component={AcademicPerformanceScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="notebook"
                            color={color}
                            size={size}
                        />
                    ),
                    title: "Журнал",
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

export default MainNavigation;
