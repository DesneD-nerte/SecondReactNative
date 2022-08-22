import { createSlice } from "@reduxjs/toolkit";
import { CurrentLesson } from "../../types";

import Data, { IAgenda } from "../../data/AgendaData";

const initialState = Data;

interface IActionCurrentLessons {
    type: string,
    payload: IAgenda<CurrentLesson>
}

const currentLessonsSlice = createSlice({
    name: 'currentLessonsAgenda',
    initialState: initialState,
    reducers: {
        toAgendaForm(state, action: IActionCurrentLessons) {
            return state = action.payload;
        }
    }
})

const { toAgendaForm } = currentLessonsSlice.actions;

export const toAgendaDataForm = (currentLessons: CurrentLesson[]) => {
    return function(dispatch) {
        const state = JSON.parse(JSON.stringify(Data));
        for (const oneCurrentLesson of currentLessons) {
            const beginDate = new Date(oneCurrentLesson.beginDate);

            const dateForItem = beginDate.toISOString().replace(/T.*/, "");

            state[dateForItem].push(oneCurrentLesson);
        }
        dispatch(toAgendaForm(state));
    }
} 

export default currentLessonsSlice.reducer;