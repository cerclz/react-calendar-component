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