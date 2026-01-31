// taskControllers.ts
import type { Request, Response } from "express"
import { Task } from "../models/Task.js"

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find()
    res.status(200).json(tasks)
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
            return res.status(201).json({message: `Task Created ${task}`})
        }
    } catch (e) {
        console.error(`Error creating new task ${e}`)
        res.status(400).json({message: `Error creating new task ${e}`})
    }
}