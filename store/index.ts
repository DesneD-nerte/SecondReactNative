import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
  } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileSlice from "./slices/profileSlice";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, profileSlice)

export const store = configureStore({
    reducer: {
        profile: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
})

export const persistor = persistStore(store);
