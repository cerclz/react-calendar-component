// DayView.tsx
import type { CalendarDay } from "./types";

type Props = {
    day: CalendarDay
}

export function DayView({ day }: Props) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 12
            }}
        >
            <div style={{ fontWeight: 700, marginBottom: 10}}>{day.isoDate}</div>
        </div>
    )
}