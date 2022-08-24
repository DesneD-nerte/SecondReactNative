import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mobileURI } from "../../config/config";
import { Group, Lesson, CurrentLesson, Marks } from "../../types";

interface IInformation {
    groups: Array<Group>,
    lessons: Array<Lesson>,
    currentLessons: Array<CurrentLesson>,
    marks: Array<Marks>,
}

interface IActionInformation {
    type: string,
    payload: IInformation
}

const initialState: IInformation = {
    groups: [],
    lessons: [],
    currentLessons: [],
    marks: []
}

const informationSlice = createSlice({
    name: 'informationSlice',
    initialState: initialState,
    reducers: {
        changeInformation(state, action: IActionInformation) {
            return state = action.payload;
        }
    }
})

const { changeInformation } = informationSlice.actions;

export const loadInformation = () => {
    return function(dispatch) {
        const requestGroups = axios.get(`${mobileURI}/api/groups`);
        const requestLessons = axios.get(`${mobileURI}/api/lessons`);
        const requestCurrentLessons = axios.get(`${mobileURI}/currentlessons`)
        const requestMarks = axios.get(`${mobileURI}/marks`)

        axios.all([requestGroups, requestLessons, requestCurrentLessons, requestMarks])
        .then(axios.spread((...response) => {
            const responseGroups= response[0].data;
            const responseLessons = response[1].data;
            const responseCurrentLessons = response[2].data;
            const responseMarks= response[3].data;

            dispatch(changeInformation({
                groups: responseGroups,
                lessons: responseLessons,
                currentLessons: responseCurrentLessons,
                marks: responseMarks,
            }));
        }))
        .catch(error => {
            console.log(error);
        })
    }
}

export default informationSlice.reducer;
