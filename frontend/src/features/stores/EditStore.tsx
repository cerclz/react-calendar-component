import { useParams } from 'react-router-dom'
import type { CreateStoreDto } from './stores.types'
import { useGetStoreByIdQuery, useUpdateStoreMutation } from './storesApiSlice'
import { useEffect, useState } from 'react'
import StoreForm from './StoreForm'


const EMPTY_STORE: CreateStoreDto = {
    name: "",
    region: "",
    address: "",
    contactDetails: { contactName: "", email: "", phone: "" },
    comments: [""],
}

type FormEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const EditStore = () => {
    /**
     * Get Store Data using id from params
     */
    const { id } = useParams<{ id: string }>()
    const [formData, setFormData] = useState<CreateStoreDto>(EMPTY_STORE)

    const { data: store, isLoading, isError, error } = useGetStoreByIdQuery(id!, {
        skip: !id
    })

        const [updateStore, { isLoading: updateLoading }] = useUpdateStoreMutation()


    useEffect(() => {
        if (store) {
            setFormData({
                name: store.name,
                region: store.region,
                address: store.address,
                contactDetails: store.contactDetails ?? {
                    contactName: "",
                    email: "",
                    phone: "",
                },
                comments: store.comments?.length ? store.comments : [""],
            })
        }
    }, [store])

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {(error as any)?.data?.message || "Unknown error"}</div>

    /**
     * Update Store
     */


    const handleChange = (e: React.ChangeEvent<FormEl>) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value

        }))
    }

    const onUpdate = async () => {
        if (!id) return

        try {
            await updateStore({ id, body: formData }).unwrap()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <StoreForm
            onSubmit={onUpdate}
            formData={formData}
            onChange={handleChange}
            isLoading={updateLoading}
            error={error}
            mode="edit"
        />
    )
}

export default EditStore