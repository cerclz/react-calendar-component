// TaskBlock.tsx

import { useState } from "react";
import { PX_PER_MINUTE, START_HOUR } from "./calendarConfig";
import type { CalendarTask } from "./types";

type Props = {
    task: CalendarTask
    onClick: () => void
    overlapIndex: number
    showDescription?: boolean
}

export function TaskBlock({ task, onClick, overlapIndex, showDescription = false }: Props) {

    const [isHover, setIsHover] = useState(false)

    const baseZ = 10 + overlapIndex
    const hoverZ = 999

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
                left: overlapIndex != 0 ? 18 * overlapIndex : 0,
                right: 3,
                backgroundColor: "blue",
                color: "white",
                borderRadius: 6,
                padding: "4px 6px",
                boxSizing: "border-box",
                overflow: "hidden",
                pointerEvents: "auto",
                cursor: "pointer",
                zIndex: isHover ? hoverZ : baseZ,
                border: overlapIndex != 0 ? "1px solid #fff" : "none"
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={(e) => {
                e.stopPropagation()
                onClick()
            }}
        >
            <div style={{ display: "grid", rowGap: 2, lineHeight: 1.2 }}>
                <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {task.title}
                </div>

                <div style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                    {String(task.startHour).padStart(2, "0")}:{String(task.startMinute).padStart(2, "0")} - {String(task.endHour).padStart(2, "0")}:{String(task.endMinute).padStart(2, "0")}
                </div>

                {showDescription && task.description && (
                    <div style={{ fontSize: 12, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {task.description}
                    </div>
                )}
            </div>

        </div>
    )
}