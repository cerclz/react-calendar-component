// CalendarGrid.tsx
import type { CalendarWeek } from "./types"

type Props = { week: CalendarWeek }

const CalendarGrid = ({ week }: Props) => {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 8
        }}>
            {week.days.map(day => (
                <div
                    key={day.isoDate}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: 12,
                        padding: 10,
                        minHeight: 220,
                    }}
                >
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>{day.isoDate}</div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
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
                    </div>

                </div>
            ))}

        </div>
    )
}

export default CalendarGrid