import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

const initialState: User = {
    _id: '',
    username: '',
    name: '',
    roles: [],
    email: '',
	imageUri: '',
	faculties: [],
	departments: [],
	groups: [],
}

interface IActionProfile {
    type: string,
    payload: User
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        loadProfile(state, action: IActionProfile) {
            return state = action.payload;
        }
    }
})

export const { loadProfile } = profileSlice.actions;

export default profileSlice.reducer;