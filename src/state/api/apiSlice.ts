import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    timeout: 1000000,
})


export const ApiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    endpoints: _ => ({}),
    tagTypes: ['Users'],
})