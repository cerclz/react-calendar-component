import { apiSlice } from "../../api/apiSlice";
import type { Store, CreateStoreDto } from "./stores.types";

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

        createStore: builder.mutation<Store, CreateStoreDto>({
            query: (body) => ({
                url: "/api/stores",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Stores", id: "LIST" }]
        }),

        deleteStore: builder.mutation<{ message: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/api/stores/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "Stores", id: arg.id },
                { type: "Stores", id: "LIST" },
            ]
        }),

    })
});

export const { useGetStoresQuery, useCreateStoreMutation, useDeleteStoreMutation } = storesApiSlice;