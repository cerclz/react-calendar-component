import { useState } from "react"
import type { CreateStoreDto } from "./stores.types"
import { useCreateStoreMutation } from "./storesApiSlice"
import StoreForm from "./StoreForm"

const EMPTY_STORE: CreateStoreDto = {
  name: '',
  region: '',
  address: '',
  contactDetails: { contactName: '', email: '', phone: '' },
  comments: [''],
}

type FormEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const CreateStore = () => {
  const [storeFormData, setStoreFormData] = useState<CreateStoreDto>(EMPTY_STORE)

  const handleChange = (e: React.ChangeEvent<FormEl>) => {
    const { name, value } = e.target

    setStoreFormData(prev => ({
      ...prev,
      [name]: value

    }))
  }


  /**
    * Create New Store 
    */
  const [createStore, { isLoading, error }] = useCreateStoreMutation()

  const onSubmit = async () => {
    try {
      await createStore(storeFormData).unwrap()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <StoreForm
      onSubmit={onSubmit}
      formData={storeFormData}
      onChange={handleChange}
      isLoading={isLoading}
      error={error}
    />
  )
}

export default CreateStore