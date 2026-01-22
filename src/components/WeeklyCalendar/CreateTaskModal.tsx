import { useEffect, useMemo, useState } from "react";
import { CalendarTask } from "./types";
import { ExtraDataForm } from "./ExtraDataForm";

type Slot = { isoDate: string; hour: number } | null

type Props = { open: boolean, slot: Slot, onClose: () => void, mode: "create" | "edit", formData: CalendarTask, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void }

const stores = ["store 1", "store 2", "store 3"]

export function CreateTaskModal({ open, slot, onClose, mode, formData, handleChange }: Props) {

    console.log(formData.store)

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
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>{isEdit ? formData.title : "Νέο task"}</div>
                    <button onClick={onClose} style={{ border: 0, background: "transparent", cursor: "pointer" }}>
                        ✕
                    </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input name="title" type="text" placeholder="Προσθήκη Τίτλου" value={formData.title} onChange={handleChange}></input>

                    <div style={{ flexDirection: "row" }}>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        >

                        </input>

                        <select name="start" value={String(formData?.start).padStart(2, "0")} onChange={handleChange}>
                            {hours.map((h) =>
                                <option>{h}</option>
                            )}
                        </select>

                        <select name="startM" value={String(formData?.startM).padStart(2, "0")} onChange={handleChange}>
                            {minutes.map((m) =>
                                <option>{m}</option>
                            )}
                        </select>

                        Έως
                        <div>
                            <input
                                type="date"
                            >

                            </input>

                            <select name="end" value={String(formData?.end).padStart(2, "0")} onChange={handleChange}>
                                {hours.map((h) =>
                                    <option>{h}</option>
                                )}
                            </select>

                            <select name="endM" value={String(formData?.endM).padStart(2, "0")} onChange={handleChange}>
                                {minutes.map((m) =>
                                    <option>{m}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <select>
                        <option>Επιλογή Κατηγορίας</option>
                    </select>

                    <input list="stores" id="store" name="store" placeholder="Αναζήτηση Καταστήματος" value={formData.store} onChange={handleChange} />

                    <datalist id="stores">
                        {stores.map(store => <option key={store} value={store} />)}
                    </datalist>

                    {formData.store && stores.includes(formData.store) && (
                        <div>
                            <textarea id="comment">
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
                        <button>Ενημέρωση</button>
                        <button>Διαγραφή</button>
                        <button>Ακύρωση</button>
                    </>
                    :
                    <>
                        <button>Αποθήκευση</button>
                        <button>Ακύρωση</button>
                    </>
                }

            </div>


        </div>
    )
}