import { createApi } from '@reduxjs/toolkit/query/react'
import { mobileURI } from "../../config/config";
import { CurrentLesson } from '../../types';
import { axiosBaseQuery } from './axiosBaseQuery';

//Don't wanna put token to store, because it in Context for now,
export const currentLessonsApi = createApi({
    reducerPath: "currentLessonsApi",
    // baseQuery: fetchBaseQuery({baseUrl: `${mobileURI}/`, prepareHeaders: (headers, {getState}) => {
    //     headers.set("Authorization", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRkODBhZjRiNGNlYzMwZDMwYWI5MDgiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlt7Il9pZCI6IjYxZGQ4MTQ0NGI0Y2VjMzBkMzBhYjkwOSIsInZhbHVlIjoiQURNSU4ifSx7Il9pZCI6IjYxZGQ4MTY5NGI0Y2VjMzBkMzBhYjkwYSIsInZhbHVlIjoiU1RVREVOVCJ9XSwiaWF0IjoxNjYxMTY5NzU3LCJleHAiOjE2NjEyNTYxNTd9.tD3mKdwiuTTH4lEm1pW7gICIKXYM3DFLXFA5CFNmG-Ii2BNKaWwWy3XS9SkcNfAguHzGpTlF8B5hmADMIU2-jg")
    //     return headers;
    // }}),
    // tagTypes: ['CurrentLessons'],
    // endpoints: (builder) => ({
    //     getCurrentLessons: builder.query<CurrentLesson[], void>({
    //         query: () => 'currentlessons', 
    //     })
    // })
    baseQuery: axiosBaseQuery({
        baseUrl: `${mobileURI}/`
    }),
    tagTypes: ['CurrentLessons'],
    endpoints: (builder) => ({
        getCurrentLessons: builder.query<CurrentLesson[], void>({
            query: () => ({url: 'currentlessons', method: 'get'})
        })
    })
})

export const { useGetCurrentLessonsQuery } = currentLessonsApi