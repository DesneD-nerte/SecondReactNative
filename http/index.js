import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { TokenContext } from "../context/tokenContext";

const $api = axios.create();
// const {isAuth, setIsAuth} = useContext(TokenContext);

$api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token')
    config.headers.Authorization = token;

    return config;
})

// $api.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     if(error.response.status == 401) {
//         setIsAuth(false)
//         console.log('lololololol');
//         AsyncStorage.clear();
//     }
// }
// )

export default $api;