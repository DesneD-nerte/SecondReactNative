import { User } from "../types";

const initialState: User = {
    _id: '',
    username: '',
    name: '',
    roles: [],
    email: '',
	imageUri: ''
}

const CHANGE_DATA = 'CHANGE_DATA';

export const profileDataReducer = (state = initialState, action) => {
	switch(action.type) {
		case CHANGE_DATA:
			return {...state, ...action.payload}

		default: 
			return state;
	}
}

export const changeProfileData = (payload) => ({type: CHANGE_DATA, payload: payload});
