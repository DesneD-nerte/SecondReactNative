import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen"

const Stack = new createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{title: "Вход"}}
            />
        </Stack.Navigator>
    );
};

export default AuthStack