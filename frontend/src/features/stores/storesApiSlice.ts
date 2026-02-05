import { apiSlice } from "../../api/apiSlice";
import type { Store, CreateStoreDto } from "./stores.types";

export type UpdateStoreArgs = {
  id: string
  body: CreateStoreDto
}

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

        getStoreById: builder.query<Store, string>({
            query: (id) => `/api/stores/${id}`,
            providesTags: (result, error, id) => [{ type: "Stores", id }],
        }),

        createStore: builder.mutation<Store, CreateStoreDto>({
            query: (body) => ({
                url: "/api/stores",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Stores", id: "LIST" }]
        }),

        updateStore: builder.mutation<Store, UpdateStoreArgs>({
            query: ({ id, body }) => ({
                url: `/api/stores/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "Stores", id: arg.id },
                { type: "Stores", id: "LIST" },
            ],
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

export const { useGetStoresQuery, useGetStoreByIdQuery, useCreateStoreMutation, useUpdateStoreMutation, useDeleteStoreMutation } = storesApiSlice;