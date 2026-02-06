// Store.ts

import mongoose from "mongoose";

export type StoreType = {
    name: string
    region: string
    address: string
    contactDetails: { contactName: string, email: string, phone: string }
    comments: string[]
}

const StoreSchema = new mongoose.Schema<StoreType>(
    {
        name: { type: String, required: true, trim: true },
        region: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        contactDetails: {
            contactName: { type: String, default: '' },
            email: { type: String, default: '' },
            phone: { type: String, default: '' }
        },
        comments: { type: [String], default: [] }
    },
    {
        timestamps: true
    }
)

export const Store = mongoose.model<StoreType>("Store", StoreSchema)