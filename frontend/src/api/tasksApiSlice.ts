// tasksApiSlice.ts

import type { CalendarTask } from "../features/WeeklyCalendar/types";
import { apiSlice } from "./apiSlice";

export type CreateTaskDto = Omit<CalendarTask, "_id">
export type GetTaskArgs = {
    from: string,
    to: string
}

export type UpdateTaskArgs = {
  id: string
  body: CreateTaskDto
}

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<CalendarTask[], GetTaskArgs>({
            query: ({ from, to }) => `/api/tasks?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
            providesTags: (result) =>
                result ?
                    [
                        ...result.map((t) => ({ type: "Tasks" as const, id: t._id })),
                        { type: "Tasks" as const, id: "LIST" },
                    ]
                    : [{ type: "Tasks" as const, id: "LIST" }]
        }),

        createTask: builder.mutation<CalendarTask, CreateTaskDto>({
            query: (body) => ({
                url: "/api/tasks",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }]
        }),

        updateTask: builder.mutation<CalendarTask, UpdateTaskArgs>({
            query: ({ id, body }) => ({
                url: `/api/tasks/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "Tasks", id: arg.id },
                { type: "Tasks", id: "LIST" },
            ],
        }),

        deleteTask: builder.mutation<{ message: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/api/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "Tasks", id: arg.id },
                { type: "Tasks", id: "LIST" },
            ]
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasksApiSlice