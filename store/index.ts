import { combineReducers, createStore } from "redux";
import { profileDataReducer } from "./profileDataReducer";
import { messagesReducer } from './messagesRecucer';

const rootReducer = combineReducers({
    profileData: profileDataReducer,
    messages: messagesReducer
})

export const store = createStore(rootReducer);