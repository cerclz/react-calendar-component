// TimeColumn.tsx
import { GRID_ROWS, START_HOUR, TOTAL_SLOTS } from "./calendarConfig";

export function TimeColumn() {

    return (
        <div style={{ display: "grid", gridTemplateRows: GRID_ROWS }}><div /> {/*Spacer for the first line*/}

            {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
                const hour = START_HOUR + i

                return (
                    <div
                        key={i}
                        style={{ position: "relative" }}
                    >
                        <div style={{ position: "absolute", top: -10, right: 6, fontSize: 12, color: "#666" }}>
                            {String(hour).padStart(2, "0")}:00
                        </div>
                    </div>
                )
            })}
        </div>
    )
}