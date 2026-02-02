import { ExtraDataForm } from "./ExtraDataForm";
import type { CalendarTask } from "./types";

type Slot = { isoDate: string; hour: number } | null

type Props = {
    open: boolean,
    slot: Slot, onClose: () => void,
    mode: "create" | "edit",
    formData: Omit<CalendarTask, "_id">,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onSubmit: () => void
    onUpdate: () => void
    isUpdating: boolean
    onDelete: () => void
    isDeleting: boolean
    isSaving: boolean
    isError: boolean
}

const stores = ["store 1", "store 2", "store 3"]
const categories = ["category 1", "category 2", "category 3"]

export function CreateTaskModal({
    open,
    onClose,
    mode,
    formData,
    handleChange,
    onSubmit,
    onUpdate,
    isUpdating,
    isDeleting,
    onDelete,
    isSaving,
    isError,
    handleTextareaChange
}: Props) {

    // Generate options for the select start and end forms
    let minutes = []
    for (let i = 0; i <= 59; i++) {
        minutes.push((`${String(i).padStart(2, '0')}`))
    }

    let hours = []
    for (let i = 0; i <= 23; i++) {
        hours.push(`${String(i).padStart(2, '0')}`)
    }

    if (!open) return null

    const isEdit = mode == "edit"

    return (
        <div
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
                onClick={(e) => e.stopPropagation()}
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
                    onSubmit()
                }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                        <div style={{ fontWeight: 800, fontSize: 18 }}>{isEdit ? formData.title : "New Task"}</div>
                        <button onClick={onClose} style={{ border: 0, background: "transparent", cursor: "pointer" }}>
                            ✕
                        </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <input name="title" type="text" placeholder="Title" value={formData.title} onChange={handleChange} required></input>
                        <div style={{ flexDirection: "row" }}>
                            <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required></input>

                            <select name="startHour" value={String(formData?.startHour).padStart(2, "0")} onChange={handleChange}>
                                {hours.map((h) =>
                                    <option key={h} value={h}>{h}</option>
                                )}
                            </select>

                            <select name="startMinute" value={String(formData?.startMinute).padStart(2, "0")} onChange={handleChange}>
                                {minutes.map((m) =>
                                    <option key={m} value={m}>{m}</option>
                                )}
                            </select>

                            <div>
                                <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required></input>

                                <select name="endHour" value={String(formData?.endHour).padStart(2, "0")} onChange={handleChange}>
                                    {hours.map((h) =>
                                        <option key={h} value={h}>{h}</option>
                                    )}
                                </select>

                                <select name="endMinute" value={String(formData?.endMinute).padStart(2, "0")} onChange={handleChange}>
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
                                        onChange={handleChange}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>

                        <div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleTextareaChange}
                                style={{ width: "96%", minHeight: "80px", marginTop: "8px", padding: "8px",  }}
                            />
                        </div>

                        <input list="stores" id="store" name="store" placeholder="Search Data" value={formData.store} onChange={handleChange} />

                        <datalist id="stores">
                            {stores.map(store => <option key={store} value={store} />)}
                        </datalist>

                        {formData.store && stores.includes(formData.store) && (
                            <div>
                                <textarea id="">
                                    a
                                </textarea>
                            </div>
                        )}

                        {formData.store && !stores.includes(formData.store) && (
                            <div>
                                <ExtraDataForm />
                            </div>
                        )}

                    </div>
                    {isEdit ?
                        <>
                            <button
                                type="button"
                                onClick={onDelete}
                                disabled={isDeleting}
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#DC143C",
                                    fontSize: "18px",
                                    marginRight: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                            <button
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#1e90ff",
                                    fontSize: "18px",
                                    marginRight: "10px"
                                }}
                            >
                                Cancel
                            </button>

                            <button
                            type="button"
                            onClick={onUpdate}
                            disabled={isUpdating}
                                style={{
                                    backgroundColor: "#1E90FF",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "18px",
                                    marginTop: "10px",
                                    color: "#fff",
                                    padding: "10px 15px",
                                    cursor: "pointer"
                                }}
                            >
                                {isUpdating ? "Updating..." : "Update"}
                            </button>

                        </>
                        :
                        <div>
                            <button
                                type="button"
                                onClick={onClose}
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "#1e90ff",
                                    fontSize: "18px",
                                    marginRight: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSaving}
                                style={{
                                    backgroundColor: "#1E90FF",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "18px",
                                    marginTop: "10px",
                                    color: "#fff",
                                    padding: "10px 15px",
                                    cursor: "pointer"
                                }}
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    }
                    {isError ? <div style={{ color: "crimson" }}>Create failed</div> : null}
                </form>
            </div>
        </div>
    )
}