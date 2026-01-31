// apiSlice.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.API,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json")
            return headers
        }
    }),
    tagTypes: ["Tasks"],
    endpoints: () => ({})
})