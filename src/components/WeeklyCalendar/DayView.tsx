// DayView.tsx
import { GRID_ROWS, HEADER_HEIGHT, SLOT_HEIGHT, START_HOUR, TOTAL_SLOTS } from "./calendarConfig";
import type { CalendarDay } from "./types";

type Props = {
    day: CalendarDay
}

export function DayView({ day }: Props) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: GRID_ROWS,
                border: "1px solid #ddd",

            }}
        >
            <div
                style={{
                    height: HEADER_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                }}
            >
                <div>{day.date.getDate()}</div>
            </div>
            <div
                style={{
                    gridRow: `2 / span ${TOTAL_SLOTS}`, // αν έχεις header row
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >

                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: `repeat(${TOTAL_SLOTS}, ${SLOT_HEIGHT}px)`,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {Array.from({ length: TOTAL_SLOTS }).map((_, slotIndex) => {
                        const hour = START_HOUR + slotIndex

                        return (
                            <button
                                key={`${day.isoDate}-${slotIndex}`}
                                type="button"
                                style={{
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
                                    borderTop:
                                        hour === START_HOUR
                                            ? "1px solid #e2e2e2"
                                            : "none",
                                    backgroundColor: "#fff",
                                }}
                            >
                            </button>

                        )
                    })}
                </div>
            </div>

        </div>
    )
}