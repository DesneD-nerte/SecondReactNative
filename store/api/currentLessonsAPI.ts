import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mobileURI } from "../../config/config";
import { CurrentLesson } from '../../types';
import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncToken = async () => {
    return await AsyncStorage.getItem('token');
}

export const currentLessonsApi = createApi({
    reducerPath: "currentLessonsApi",
    baseQuery: fetchBaseQuery({baseUrl: `${mobileURI}/`, prepareHeaders: (headers, {getState}) => {
        headers.set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGQ4MGFmNGI0Y2VjMzBkMzBhYjkwOCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6W3siX2lkIjoiNjFkZDgxNDQ0YjRjZWMzMGQzMGFiOTA5IiwidmFsdWUiOiJBRE1JTiJ9LHsiX2lkIjoiNjFkZDgxNjk0YjRjZWMzMGQzMGFiOTBhIiwidmFsdWUiOiJTVFVERU5UIn1dLCJpYXQiOjE2NjA2Njc5NzQsImV4cCI6MTY2MDc1NDM3NH0.okPfjtoaecdQr0HL8pjLtqE3X2gSp37ZCKHbOHYpQQ0")
        return headers;
    }}),
    endpoints: (builder) => ({
        getCurrentLessons: builder.query<CurrentLesson[], void>({
        // getCurrentLessons: builder.query({
            query: () => 'currentlessons',
        })
    })
})

export const { useGetCurrentLessonsQuery } = currentLessonsApi