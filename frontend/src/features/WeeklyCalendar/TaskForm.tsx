import type { CreateStoreDto } from "../stores/stores.types"
import type { CreateTaskDto } from "./types"

type FormEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

type Props = {
    open: boolean
    title: string
    isEdit: boolean
    formData: CreateTaskDto
    onChange: (e: React.ChangeEvent<FormEl>) => void
    onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement>
    storeNames: string[]
    storesLoading: boolean
    storesError?: unknown
    isNewStore: boolean
    newStoreData: CreateStoreDto
    onClose: () => void
    onDelete?: () => void
    onSave: () => void
    isSaving: boolean
    saveError?: unknown
    isDeleting?: boolean
    deleteError?: unknown
    onNewStoreChange: (e: React.ChangeEvent<FormEl>) => void
}

const TaskForm = ({
    open,
    title,
    isEdit,
    formData,
    onChange,
    onTextAreaChange,
    storeNames,
    storesLoading,
    storesError,
    isNewStore,
    newStoreData,
    onClose,
    onDelete,
    onSave,
    isSaving,
    saveError,
    isDeleting,
    deleteError,
    onNewStoreChange
}: Props) => {
    if (!open) return null

    const categories = ["category 1", "category 2", "category 3"]

    // Generate options for the select start and end forms
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))

    return (
        <div
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                display: "grid",
                placeItems: "center",
                zIndex: 50,
                padding: 16,
            }}
        >
            <div
                onMouseDown={(e) => e.stopPropagation()}
                style={{
                    width: "min(510px, 100%",
                    background: "white",
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
            >

                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave()
                }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                        <div style={{ fontWeight: 800, fontSize: 18 }}>{title}</div>
                        <button onClick={onClose} style={{ border: 0, background: "transparent", cursor: "pointer" }}>
                            ✕
                        </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <input name="title" type="text" placeholder="Title" value={formData.title} onChange={onChange} required></input>
                        <div style={{ flexDirection: "row" }}>
                            <input name="startDate" type="date" value={formData.startDate} onChange={onChange} required></input>

                            <select name="startHour" value={String(formData?.startHour).padStart(2, "0")} onChange={onChange}>
                                {hours.map((h) =>
                                    <option key={h} value={h}>{h}</option>
                                )}
                            </select>

                            <select name="startMinute" value={String(formData?.startMinute).padStart(2, "0")} onChange={onChange}>
                                {minutes.map((m) =>
                                    <option key={m} value={m}>{m}</option>
                                )}
                            </select>

                            <div>
                                <input name="endDate" type="date" value={formData.endDate} onChange={onChange} required></input>

                                <select name="endHour" value={String(formData?.endHour).padStart(2, "0")} onChange={onChange}>
                                    {hours.map((h) =>
                                        <option key={h} value={h}>{h}</option>
                                    )}
                                </select>

                                <select name="endMinute" value={String(formData?.endMinute).padStart(2, "0")} onChange={onChange}>
                                    {minutes.map((m) =>
                                        <option key={m} value={m}>{m}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {categories.map((cat) => (
                                <label
                                    key={cat}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px 14px",
                                        border: "1px solid #ddd",
                                        background: formData.category === cat ? "#1E90FF" : "transparent",
                                        color: formData.category === cat ? "#fff" : "#000",
                                        gap: 8,
                                        cursor: "pointer"
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat}
                                        style={{ display: "none" }}
                                        onChange={onChange}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>

                        <div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={onTextAreaChange}
                                style={{ width: "96%", minHeight: "80px", marginTop: "8px", padding: "8px", }}
                            />
                        </div>

                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <label style={{ fontWeight: 600 }}>Store</label>
                        <input
                            list="stores"
                            id="store"
                            name="store"
                            placeholder={storesLoading ? "Loading stores..." : "Search store"}
                            value={formData.store}
                            onChange={onChange}
                            disabled={storesLoading || !!storesError}
                        />
                        <datalist id="stores">
                            {storeNames.map((name) => (
                                <option key={name} value={name} />
                            ))}
                        </datalist>

                        {storesError ? <div style={{ color: "crimson", fontSize: 13 }}>Failed to load stores</div> : null}
                    </div>

                    {isNewStore ? (
                        <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 12, display: "grid", gap: 8 }}>
                            <div style={{ fontWeight: 700 }}>New store details</div>

                            <input
                                name="name"
                                placeholder="Store Name"
                                value={newStoreData.name}
                                onChange={onNewStoreChange}
                                required
                            />

                            <input
                                name="region"
                                placeholder="Region"
                                value={newStoreData.region}
                                onChange={onNewStoreChange}
                                required
                            />

                            <input
                                name="address"
                                placeholder="Address"
                                value={newStoreData.address}
                                onChange={onNewStoreChange}
                                required
                            />

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                <input
                                    name="contactDetails.contactName"
                                    placeholder="Contact Name"
                                    value={newStoreData.contactDetails.contactName}
                                    onChange={onNewStoreChange}
                                />
                                <input
                                    name="contactDetails.email"
                                    placeholder="Email"
                                    value={newStoreData.contactDetails.email}
                                    onChange={onNewStoreChange}
                                />
                            </div>

                            <input
                                name="contactDetails.phone"
                                placeholder="Phone"
                                value={newStoreData.contactDetails.phone}
                                onChange={onNewStoreChange}
                            />
                        </div>
                    ) : null}
                    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                        {isEdit && onDelete ? (
                            <button
                                type="button"
                                onClick={onDelete}
                                disabled={!!isDeleting}
                                style={{ background: "transparent", border: "none", color: "#DC143C", cursor: "pointer" }}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        ) : null}

                        <button type="button" onClick={onClose} style={{ background: "transparent", border: "none", color: "#1e90ff" }}>
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSaving}
                            style={{
                                backgroundColor: "#1E90FF",
                                border: "none",
                                borderRadius: "10px",
                                fontSize: "16px",
                                color: "#fff",
                                padding: "10px 15px",
                                cursor: "pointer",
                            }}
                        >
                            {isSaving ? "Saving..." : isEdit ? "Update" : "Save"}
                        </button>
                    </div>

                    {saveError ? <div style={{ color: "crimson", marginTop: 6 }}>Save failed</div> : null}
                    {deleteError ? <div style={{ color: "crimson", marginTop: 6 }}>Delete failed</div> : null}
                </form>
            </div>
        </div>
    )
}

export default TaskForm