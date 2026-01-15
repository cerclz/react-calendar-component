// CalendarGrid.tsx
import type { CalendarWeek } from "./types"
import { getCurrentDay, isToday } from "./date.utils"
import { GRID_ROWS, HEADER_HEIGHT, START_HOUR, TOTAL_SLOTS } from "./calendarConfig"

type Props = { week: CalendarWeek, onSlotClick: (slot: { isoDate: string, hour: number }) => void }

const CalendarGrid = ({ week, onSlotClick }: Props) => {

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: GRID_ROWS,
            gap: 0,
            borderLeft: "1px solid #ddd",
        }}
        >

            {/* Header Row */}
            {week.days.map((day, i) => (
                <div
                    key={day.isoDate}
                    style={{
                        gridColumn: i + 1,
                        gridRow: 1,
                        height: HEADER_HEIGHT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        /* ⬇️ μόνο αν ΔΕΝ είναι πρώτη στήλη */
                        borderLeft: i === 0 ? "none" : "1px solid #e2e2e2",

                        /* ⬇️ μόνο αν είναι τελευταία στήλη */
                        borderRight:
                            i === week.days.length - 1
                                ? "1px solid #e2e2e2"
                                : "none",
                    }}
                >
                    <div>{day.date.getDate()}</div>
                    <div>{getCurrentDay(day.date.getDay())}</div>
                </div>
            ))}

            {/* Slots (rows 2..TOTAL_SLOTS+1) */}
            {week.days.map((day: any, dayIndex: number) =>
                Array.from({ length: TOTAL_SLOTS }).map((_, slotIndex) => {
                    const gridRow = 2 + slotIndex
                    const hour = START_HOUR + slotIndex


                    return (
                        <button
                            key={`${day.isoDate}-${slotIndex}`}
                            type="button"
                            onClick={() => onSlotClick({ isoDate: day.isoDate, hour })}
                            style={{
                                gridColumn: dayIndex + 1,
                                gridRow,
                                width: "100%",
                                height: "100%",
                                padding: 0,
                                margin: 0,
                                cursor: "pointer",
                                textAlign: "left",
                                boxSizing: "border-box",
                                display: "block",
                                lineHeight: 0,
                                border: "none",
                                borderBottom: "1px solid #e2e2e2",
                                /* ⬇️ μόνο αν ΔΕΝ είναι πρώτη στήλη */
                                borderLeft: dayIndex === 0 ? "none" : "1px solid #e2e2e2",

                                /* ⬇️ μόνο αν είναι τελευταία στήλη */
                                borderRight:
                                    dayIndex === week.days.length - 1
                                        ? "1px solid #e2e2e2"
                                        : "none",

                                /* ⬇️ μόνο αν είναι πρώτη ώρα */
                                borderTop:
                                    hour === START_HOUR
                                        ? "1px solid #e2e2e2"
                                        : "none",
                                backgroundColor: "#fff",
                            }}
                        >

                            {`${day.isoDate}   Ωρα:${slotIndex}`}
                        </button>

                    )
                })
            )}
        </div>
    )
}

export default CalendarGrid