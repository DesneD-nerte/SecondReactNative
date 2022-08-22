import AsyncStorage from "@react-native-async-storage/async-storage"
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query"
import axios, { AxiosRequestConfig, AxiosError } from "axios"

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
    {
        url: string
        method: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
        params?: AxiosRequestConfig['params']
    },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params }) => {
            try {
                const token = await AsyncStorage.getItem("token");
                const result = await axios({ url: baseUrl + url, method, data, params, headers: {'authorization': token} })
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }}