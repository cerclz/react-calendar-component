// TaskBlock.tsx

import { PX_PER_MINUTE, SLOT_HEIGHT, START_HOUR } from "./calendarConfig";
import { CalendarTask } from "./types";

export function TaskBlock({ task }: { task: CalendarTask }) {
    console.log(task)

    const startMinutes = task.start * 60 + task.startM // total minutes
    const endMinutes = task.end * 60 + task.endM // total minutes


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
            }}
        >
            {task.title}
        </div>
    )
}