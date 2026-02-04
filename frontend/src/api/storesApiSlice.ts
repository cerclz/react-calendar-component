import { apiSlice } from "./apiSlice";
import type { Store, CreateStoreDto } from "../components/stores/stores.types";

const storesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query<Store[], void>({
            query: () => "/api/stores",
            providesTags: (result) =>
                result ?
                    [
                        ...result.map((t) => ({ type: "Stores" as const, id: t._id })),
                        { type: "Stores" as const, id: "LIST" },
                    ]
                    : [{ type: "Stores" as const, id: "LIST" }]
        }),

    })
});

export const { useGetStoresQuery } = storesApiSlice;