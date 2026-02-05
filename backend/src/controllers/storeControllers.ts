import mongoose from "mongoose";
import { Store } from "../models/Store.js";
import type { Request, Response } from "express"

export const getStores = async (req: Request, res: Response) => {
    try {

        const stores = await Store.find().lean()

        return res.status(200).json(stores)
    } catch (e) {
        console.error(`Error fetching stores: ${e}`)
        return res.status(500).json({ message: `Error fetching stores: ${e}` })
    }
}

export const createStore = async (req: Request, res: Response) => {
    const { name, region, address, contactDetails, comments } = req.body
    if (!name || !region || !address) {
        return res.status(400).json("All fields are required")
    }

    try {
        const store = await Store.create({
            name: name.trim(),
            region: region.trim(),
            address: address.trim(),
            contactDetails,
            comments
        })

        if (store) {
            return res.status(201).json({ message: `Store Created ${store}` })
        }
    } catch (e) {
        console.error(`Error creating new store ${e}`)
        res.status(400).json({ message: `Error creating new store ${e}` })
    }
}

/**
 * @desc    Delete a store
 * @route   DELETE /api/stores/:id 
 * @access  Private
 */

export const deleteStore = async (req: Request, res: Response) => {
    const { id } = req.params

    if (typeof id !== "string") {
        return res.status(400).json({ message: "Store id is required" })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid store id" })
    }

    try {
        const deleted = await Store.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ message: "Store not found" })
        }

        return res.status(200).json({ message: "Store deleted successfully" })
    } catch (e) {
        console.error(`Error deleting store: ${e}`)
        return res.status(500).json({ message: `Error deleting store: ${e}` })
    }
}