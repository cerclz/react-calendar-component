type FormEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
import type { CreateStoreDto } from "./stores.types"

type Props = {
  onSubmit: () => void
  formData: CreateStoreDto
  onChange: (e: React.ChangeEvent<FormEl>) => void
  isLoading: boolean
  error: any
}

const StoreForm = ({ onSubmit, formData, onChange, isLoading, error }: Props) => {
  return (
    <div className="container column justify-center items-center">

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!isLoading) onSubmit()
        }}>

        {/* ERROR */}
        {error && (
          <div
            role="alert"
            className="row items-center"
            style={{
              padding: 12,
              borderRadius: 8,
              background: "#fdecea",
              border: "1px solid #f5c2c7",
              color: "#842029",
              fontSize: 14,
            }}
          >
            Error, somethibg went wrong
          </div>
        )}
        Add New Store
        <div className="row">
          <input type="text" name="name" placeholder="Store Name" required value={formData.name} onChange={onChange}></input>
        </div>
        <div className="row">
          <input type="text" name="region" placeholder="Region" required value={formData.region} onChange={onChange}></input>
        </div>
        <div className="row">
          <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={onChange}></input>
        </div>

        <div className="row">
          Contact Details
        </div>
        <div className="row">
          <input type="text" name="contactName" placeholder="Contact Name" value={formData.contactDetails.contactName} onChange={onChange}></input>
        </div>
        <div className="row">
          <input type="email" name="email" placeholder="Email" value={formData.contactDetails.email} onChange={onChange}  ></input>
        </div>
        <div className="row">
          <input type="text" name="phone" placeholder="Phone Number" value={formData.contactDetails.phone} onChange={onChange}  ></input>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default StoreForm