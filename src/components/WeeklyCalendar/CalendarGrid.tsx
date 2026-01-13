// CalendarGrid.tsx
import type { CalendarWeek } from "./types"
import { getCurrentDay, isToday } from "./date.utils"

type Props = { week: CalendarWeek }

const CalendarGrid = ({ week }: Props) => {

    const hours = Array.from({ length: 16 }, (_, i) => 16 + i)

    console.log(week)

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 0,
            border: "1px solid #ddd",

        }}>
            {week.days.map(day => (
                <div
                    key={day.isoDate}
                    style={{
                    }}
                >
                    <div style={{ fontWeight: 700, marginBottom: 8, textAlign: "center" }}>{day.date.getDate()}</div>
                    <div style={{ fontWeight: 700, marginBottom: 8, textAlign: "center" }}>{getCurrentDay(day.date.getDay())}</div>

                    {hours.map((hour) =>
                        <div key={`${day.isoDate}-${hour}`} style={{ border: "1px solid #ddd" }}>
                            <div style={{ display: "grid", gridTemplateRows: `repeat(${hours.length}, 4px)` }}>

                            </div>
                        </div>
                    )}


                    {/*<div style={{ display: "flex", flexDirection: "column" }}>
                        {day.tasks.length === 0 ? (
                            <div style={{ opacity: 0.5, fontSize: 12 }}> No tasks </div>
                        ) : (
                            day.tasks.map(task => (
                                <div
                                    key={task.id}
                                    style={{ border: "1px solid #ccc", borderRadius: 10, padding: 8 }}
                                >
                                    <div style={{ fontWeight: 600 }}>{task.title}</div>
                                    <div style={{ fontSize: 12, opacity: 0.7 }}>{task.start} - {task.end}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>*/}

                </div>
            ))}

        </div>
    )
}

export default CalendarGrid