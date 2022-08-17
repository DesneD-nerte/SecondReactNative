import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
  } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileSlice from "./slices/profileSlice";
import { currentLessonsApi } from "./api/currentLessonsAPI";
import { setupListeners } from '@reduxjs/toolkit/query'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, profileSlice)

export const store = configureStore({
    reducer: {
        profile: persistedReducer,
        [currentLessonsApi.reducerPath]: currentLessonsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(currentLessonsApi.middleware),
})

setupListeners(store.dispatch) 

export const persistor = persistStore(store);
