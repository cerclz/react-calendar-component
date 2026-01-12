// TimeColumn.tsx
import { TimeColumnProps } from "./types";

export function TimeColumn({ startHour = 7, endHour = 22, stepMinutes = 60 }: TimeColumnProps) {
    const hours = []

    for (let i = startHour; i <= endHour; i++) {
        hours.push(`${String(i).padStart(2, '0')}:00`)
    }

    return (
        <div style={{ position: "sticky", left: 0 }}>
            {hours.map(hour => (
                <div style={{fontSize: "16px", height: "var(--hour-height)"}} key={hour}>
                    {hour}
                </div>
            ))}
        </div>
    )
}