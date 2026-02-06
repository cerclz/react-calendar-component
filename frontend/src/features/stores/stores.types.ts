export type Store = {
    _id: string
    name: string
    region: string
    address: string
    contactDetails: { contactName: string, email: string, phone: string }
    comments: string[]
}

export type CreateStoreDto = Omit<Store, "_id">