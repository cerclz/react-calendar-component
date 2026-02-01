// TaskBlock.tsx

import { PX_PER_MINUTE, START_HOUR } from "./calendarConfig";
import type { CalendarTask } from "./types";

type Props = {
    task: CalendarTask
    onClick: () => void
}

export function TaskBlock({ task, onClick }: Props) {

    const startMinutes = task.startHour * 60 + task.startMinute // total minutes
    const endMinutes = task.endHour * 60 + task.endMinute // total minutes


    const top = (startMinutes - START_HOUR * 60) * PX_PER_MINUTE
    const height = Math.max(8, (endMinutes - startMinutes) * PX_PER_MINUTE)

    return (
        <div
            style={{
                position: "absolute",
                top,
                height,
                left: 3,
                right: 3,
                backgroundColor: "blue",
                color: "white",
                borderRadius: 6,
                padding: "4px 6px",
                boxSizing: "border-box",
                overflow: "hidden",
                pointerEvents: "auto",
                cursor: "pointer"
            }}
            onClick={(e) => {
                e.stopPropagation()
                onClick()
            }}
        >
            <div>
                {task.title}

            </div>
            {String(task.startHour).padStart(2, "0")}:{String(task.startMinute).padStart(2, "0")} - {String(task.endHour).padStart(2, "0")}:{String(task.endMinute).padStart(2, "0")}
        </div>
    )
}