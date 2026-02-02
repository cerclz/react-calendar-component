// CalendarGrid.tsx
import type { CalendarTask, CalendarWeek } from "./types"
import { getCurrentDay, isToday } from "./date.utils"
import { GRID_ROWS, HEADER_HEIGHT, SLOT_HEIGHT, START_HOUR, TOTAL_SLOTS } from "./calendarConfig"
import { TaskBlock } from "./TaskBlock"
import { calculateTaskOverlap } from "./buildCalendar"

type Props = {
    week: CalendarWeek,
    onSlotClick: (slot: { isoDate: string, hour: number }) => void,
    onTaskClick: (task: CalendarTask) => void
    tasksLoading?: boolean
    isError?: boolean
}

const CalendarGrid = ({ week, onSlotClick, onTaskClick, tasksLoading, isError }: Props) => {

    return (
        /**
         * 7 Day Calendar Grid (One Column / day)
         * 24 Rows (1 / hour) + 1 Header Row
         */

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: GRID_ROWS,
            gap: 0,
            borderLeft: "1px solid #ddd",
        }}
        >

            {/**
             * Header Row 
             * Highlighting Current Day
            */}
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
                        flexDirection: "column",
                        fontWeight: 700,
                        borderLeft: i === 0 ? "none" : "1px solid #e2e2e2",
                        borderRight:
                            i === week.days.length - 1
                                ? "1px solid #e2e2e2"
                                : "none",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: isToday(day.date) ? "#1E90FF" : ' none',
                            color: isToday(day.date) ? "white" : ' none',
                            height: "50px",
                            width: "50px",
                            textAlign: "center",
                            lineHeight: 2.8,
                            fontSize: "18px",
                            borderRadius: "50%"
                        }}
                    >
                        {day.date.getDate()}
                    </div>
                    <div
                        style={{ fontSize: 12, marginTop: "5px" }}
                    >
                        {getCurrentDay(day.date.getDay()).slice(0, 3).toUpperCase()}
                    </div>
                </div>
            ))}

            {/**
             * Rendering Clickable Buttons (24h * 7d) to create task
             */}
            {week.days.map((day: any, dayIndex: number) =>
                <div
                    key={day.isoDate}
                    style={{
                        gridColumn: dayIndex + 1,
                        gridRow: `2 / span ${TOTAL_SLOTS}`,
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div style={{
                        display: "grid",
                        gridTemplateRows: `repeat(${TOTAL_SLOTS}, ${SLOT_HEIGHT}px)`,
                        width: "100%",
                        height: "100%",
                    }}>
                        {Array.from({ length: TOTAL_SLOTS }).map((_, slotIndex) => {
                            const hour = START_HOUR + slotIndex

                            return (
                                <button
                                    key={`${day.isoDate}-${slotIndex}`}
                                    type="button"
                                    onClick={() => onSlotClick({ isoDate: day.isoDate, hour })}
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
                                        borderLeft: dayIndex === 0 ? "none" : "1px solid #e2e2e2",
                                        borderRight:
                                            dayIndex === week.days.length - 1
                                                ? "1px solid #e2e2e2"
                                                : "none",
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
                    {/**
                     * Rendering Clickable events
                     */}
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                        {/* Loading overlay */}
                        {tasksLoading && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(255,255,255,0.6)",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    zIndex: 2,
                                    pointerEvents: "none",
                                }}
                            >
                                Loading…
                            </div>
                        )}

                        {/* Error overlay */}
                        {isError && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "grid",
                                    placeItems: "center",
                                    background: "rgba(255,0,0,0.08)",
                                    color: "#b00020",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    zIndex: 2,
                                    pointerEvents: "none",
                                    textAlign: "center",
                                    padding: 8,
                                }}
                            >
                                Failed to load tasks
                            </div>
                        )}
                        {/* Tasks */}
                        {!tasksLoading && !isError && (() => {
                            const tasks = day.tasks ?? []
                            let overlapIndex = 0

                            return tasks.map((task: CalendarTask, index: number) => {
                                overlapIndex = calculateTaskOverlap(tasks, index, overlapIndex)

                                return (
                                    <TaskBlock
                                        key={task._id}
                                        task={task}
                                        onClick={() => onTaskClick(task)}
                                        overlapIndex={overlapIndex}
                                    />
                                )
                            })
                        })()}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CalendarGrid