import { useContext, useLayoutEffect} from 'react'
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RequestIncerceptor = ({ children }) => {
    const [ stateAuth, authActions ] = useContext(AuthContext);
    
    useLayoutEffect(() => {
        axios.interceptors.request.use(async config => {
            const token = await AsyncStorage.getItem('token')
            config.headers.Authorization = token;
        
            return config;
        }, function (error) {
            console.log('interceptor request error', error);

            return Promise.reject(error);
        })
    }, [])

   
    useLayoutEffect(() => {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
                console.log('interceptor response error', error);
                if(error.response.status == 401) {
                    authActions.signOut();
                }

                return Promise.reject(error);
            }
        )
    }, [])

    return children
}

export default RequestIncerceptor