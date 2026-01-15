import { useEffect, useMemo, useState } from "react";

type Slot = { isoDate: string; hour: number } | null

type Props = { open: boolean, slot: Slot, onClose: () => void }

export function CreateTaskModal({ open, slot, onClose }: Props) {

    // Set times based on the clicked slot
    const defaultTimes = useMemo(() => {
        if (!slot) return null

        const start = new Date(`${slot.isoDate}T${String(slot.hour).padStart(2, "0")}:00:00`)
        const end = new Date(start.getTime() + 60 * 60 * 1000)
        return { start, end }
    }, [slot])

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
                    width: "min(620px, 100%",
                    background: "white",
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>Νέο task</div>
                    <button onClick={onClose} style={{ border: 0, background: "transparent", cursor: "pointer" }}>
                        ✕
                    </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input type="text" placeholder="Προσθήκη Τίτλου"></input>

                    <div style={{ flexDirection: "row" }}>
                        <input
                            type="date"
                        >

                        </input>

                        <select defaultValue={slot?.hour}>
                            {hours.map((h) =>
                                <option>{h}</option>
                            )}
                        </select>

                        <select>
                            {minutes.map((m) =>
                                <option>{m}</option>
                            )}
                        </select>

                        Έως
                        <input
                            type="date"
                        >

                        </input>

                        <select defaultValue={slot?.hour}>
                            {hours.map((h) =>
                                <option>{h}</option>
                            )}
                        </select>

                        <select>
                            {minutes.map((m) =>
                                <option>{m}</option>
                            )}
                        </select>
                    </div>

                    <select>
                        <option>Επιλογή Κατηγορίας</option>
                    </select>

                    <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" placeholder="Αναζήτηση Καταστήματος" />

                    <datalist id="ice-cream-flavors">
                        <option value="Chocolate"></option>
                        <option value="Coconut"></option>
                        <option value="Mint"></option>
                        <option value="Strawberry"></option>
                        <option value="Vanilla"></option>
                    </datalist>

                </div>

            </div>

        </div>
    )
}