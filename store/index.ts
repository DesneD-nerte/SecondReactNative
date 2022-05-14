import { combineReducers, createStore } from "redux";
import { profileDataReducer } from "./profileDataReducer";
import { messagesReducer } from './messagesRecucer';
// import storage from 'redux-persist/lib/storage' 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
    profileData: profileDataReducer,
    messages: messagesReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// export const store = createStore(rootReducer);