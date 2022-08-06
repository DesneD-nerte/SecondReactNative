import axios from "axios";
import { mobileURI } from "../config/config";
import { User } from "../types";

export const loginHttpPostData = (username: string, password: string) => {

    return axios.post(`${mobileURI}/api/auth/login`, {username: username, password: password})
    .then(response => {

        const {_id, username, name, roles, email, imageUri, faculties, departments, groups} = response.data;
        const storeData = {_id, username, name, roles, email, imageUri, faculties, departments, groups};
        
        return {storeData, response};
    })

}

export const getMyData = (user: User) => {
    return axios.get(`${mobileURI}/myprofile`)
    .then(response => {
        return response.data;
    })
}