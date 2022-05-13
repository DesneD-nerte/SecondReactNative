import React, {useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stack/AuthStack';
import {TokenContext} from './context/tokenContext';
import AppStack from './stack/AppStack';
import { Provider } from 'react-redux';
import { store } from './store';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
        if(AsyncStorage.getItem('token')) {
            setIsAuth(true);
        } 
    }, [])

	return (
		<Provider store={store}>
			<TokenContext.Provider value={{
				isAuth,
				setIsAuth: setIsAuth
			}}>
				<NavigationContainer>
					{isAuth
						? <AppStack/>
						: <AuthStack/> 
					}
				</NavigationContainer>
			</TokenContext.Provider>
		</Provider>
  	);
}

