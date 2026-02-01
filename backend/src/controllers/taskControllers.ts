// taskControllers.ts
import type { Request, Response } from "express"
import mongoose from "mongoose"
import { Task } from "../models/Task.js"

/**
 * @desc   Get calendar tasks within date range
 * @route  GET /api/tasks?from=yyyy-mm-dd&to=yyyy-mm-dd
 * @access Private
 * @param req Express request object (expects query params: from, to)
 * @param res Express response object
 * @returns Array of calendar tasks within the given date range
 */

export const getTasks = async (req: Request, res: Response) => {
    try {
        const from = typeof req.query.from === "string" ? req.query.from : undefined
        const to = typeof req.query.to === "string" ? req.query.to : undefined

        if (!from || !to) {
            return res.status(400).json({ message: "Missing Query Parameters 'from' and 'to'" })
        }

        const tasks = await Task.find({
            startDate: { $gte: from, $lte: to }
        })
            .sort({ startDate: 1, startHour: 1, startMinute: 1 })
            .lean()

        return res.status(200).json(tasks)

    } catch (e) {
        console.error(`Error fetching tasks: ${e}`)
        return res.status(500).json({ message: `Error fetching tasks: ${e}` })
    }
}
/**
 * @desc    Create new calendar task
 * @route   POST /api/tasks 
 * @access  Private
 */
export const createTask = async (req: Request, res: Response) => {
    console.log(req.body)
    const { title, startDate, endDate, startHour, endHour, startMinute, endMinute, category, comment } = req.body

    if (!title || !startDate || !endDate || !startHour || !endHour || !startMinute || !endMinute || !category) {
        return res.status(400).json("All fields are required")
    }

    try {
        const task = await Task.create({
            title,
            startDate,
            endDate,
            startHour,
            endHour,
            startMinute,
            endMinute,
            category,
            comment
        })

        if (task) {
            return res.status(201).json({ message: `Task Created ${task}` })
        }
    } catch (e) {
        console.error(`Error creating new task ${e}`)
        res.status(400).json({ message: `Error creating new task ${e}` })
    }
}

/**
 * @desc    Delete a calendar task
 * @route   DELETE /api/tasks 
 * @access  Private
 */

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params

    if (typeof id !== "string") {
        return res.status(400).json({ message: "Task id is required" })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid task id" })
    }

    try {
        const deleted = await Task.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ message: "Task not found" })
        }

        return res.status(200).json({ message: "Task deleted successfully" })
    } catch (e) {
        console.error(`Error deleting task: ${e}`)
        return res.status(500).json({ message: `Error deleting task: ${e}` })
    }
}