// Task.ts

import mongoose from "mongoose";

export type TaskType = {
    title: string
    startDate: string
    endDate: string
    startHour: number
    startMinute: number
    endHour: number
    endMinute: number
    category: string
    comment: string
}

const TaskSchema = new mongoose.Schema<TaskType>(
    {
        title: { type: String, required: true, trim: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        startHour: { type: Number, required: true, min: 0, max: 23 },
        startMinute: { type: Number, required: true, min: 0, max: 59 },
        endHour: { type: Number, required: true, min: 0, max: 23 },
        endMinute: { type: Number, required: true, min: 0, max: 59 },
        category: { type: String, default: "" },
        comment: { type: String, default: "" }
    },
    {
        timestamps: true
    }
)

export const Task = mongoose.model<TaskType>("Task", TaskSchema)