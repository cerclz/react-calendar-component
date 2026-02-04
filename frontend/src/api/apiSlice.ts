// apiSlice.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json")
            return headers
        }
    }),
    tagTypes: ["Tasks", "Stores"],
    endpoints: () => ({})
})