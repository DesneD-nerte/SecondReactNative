import { useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stack/AuthStack';
import AppStack from './stack/AppStack';
import { Provider } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from './context/AuthContext';
import RequestIncerceptor from './http/RequestIncerceptor';
import { useAuth } from './hooks/useAuth';

import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './store/index';


export default function App() {
	
	const [stateAuth, authActions] = useAuth();

	useEffect(() => {
        if(AsyncStorage.getItem('token')) {
            authActions.signIn(AsyncStorage.getItem('token'));
        } 
    }, [])

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AuthContext.Provider value={[stateAuth, authActions]}>
					<NavigationContainer>
						{stateAuth.isAuth
							? 
							<RequestIncerceptor>
								<AppStack/>
							</RequestIncerceptor>
							: <AuthStack/> 
						}
					</NavigationContainer>
				</AuthContext.Provider>
			</PersistGate>
		</Provider>
  	);
}

