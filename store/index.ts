import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
  } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileSlice from "./slices/profileSlice";
import currentLessonsSlice from "./slices/currentLessonsSlice";
import { currentLessonsApi } from "./api/currentLessonsAPI";
import { setupListeners } from '@reduxjs/toolkit/query'
import informationSlice from "./slices/informationSlice";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, profileSlice)

export const store = configureStore({
    reducer: {
        profile: persistedReducer,
        currentLessonsAgenda: currentLessonsSlice,
        information: informationSlice,
        [currentLessonsApi.reducerPath]: currentLessonsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(currentLessonsApi.middleware),
})

setupListeners(store.dispatch) 

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch