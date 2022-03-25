import { Message } from "../types";

const initialState: Array<Message> = [{
    _id: '',
    content: '',
    createdAt: new Date(),
    user: null
}]

const CHANGE_LAST_MESSAGES = 'CHANGE_LAST_MESSAGES';

export const messagesReducer = (state = initialState, action) => {
	switch(action.type) {
		case CHANGE_LAST_MESSAGES:
			return {...state, ...action.payload}

		default: 
			return state;
	}
}

export const changeLastMessages = (payload) => ({type: CHANGE_LAST_MESSAGES, payload: payload});
