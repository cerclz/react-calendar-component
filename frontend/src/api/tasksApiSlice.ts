// tasksApiSlice.ts

import { apiSlice } from "./apiSlice";
import type { CalendarTask } from "../components/WeeklyCalendar/types";

export type CreateTaskDto = Omit<CalendarTask, "id">

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<CalendarTask[], { date?: string } | void>({
            query: (args) => {
                const date = args && "date" in args ? args.date : undefined
                return date ? `/api/tasks?date=${encodeURIComponent(date)}` : "/api/tasks"
            },
            providesTags: (result) =>
                result ?
                    [
                        ...result.map((t) => ({ type: "Tasks" as const, id: t.id })),
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
        })
    }),
    overrideExisting: false,
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation
} = tasksApiSlice