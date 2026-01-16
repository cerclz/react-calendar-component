import { useMemo, useState } from "react"
import type { CalendarTask } from "./types"
import { buildCalendarWeek, buildCalendarDay, addDays } from "./buildCalendar"
import { CalendarHeader } from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import { DayView } from "./DayView"
import { TimeColumn } from "./TimeColumn"
import { getCurrentMonth } from "./date.utils"
import { CreateTaskModal } from "./CreateTaskModal"

type ViewMode = "day" | "week"
type Props = {
    tasks: CalendarTask[]
}

type Slot = {
    isoDate: string,
    hour: number
}

export function WeeklyCalendar({ tasks }: Props) {

    const [viewMode, setViewMode] = useState<ViewMode>("week")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<Slot | null> (null)

    const openCreateModal = (slot: Slot) => {
        setSelectedSlot(slot)
        setIsModalOpen(true)
    }

    const closeCreateModal = () => {
        setIsModalOpen(false)
        setSelectedSlot(null)
    }

    const week = useMemo(() => buildCalendarWeek(selectedDate, tasks), [selectedDate, tasks])
    const day = useMemo(() => buildCalendarDay(selectedDate, tasks), [selectedDate, tasks])

    console.log(week)

    const today = () => setSelectedDate(new Date())

    // Go prev day if view mode is day else go prev week
    const goPrev = () => setSelectedDate(d => (viewMode === "day" ? addDays(d, -1) : addDays(d, -7)))

    // Go next day if view mode is day else go next week
    const goNext = () => setSelectedDate(d => (viewMode === "day" ? addDays(d, +1) : addDays(d, 7)))

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <CalendarHeader
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onPrev={goPrev}
                onNext={goNext}
                today={today}
                title={getCurrentMonth(selectedDate.getMonth()) + ` ${selectedDate.getFullYear()}`}
                // title={viewMode === "day" ? day.isoDate : `${week.days[0].isoDate} -> ${week.days[6].isoDate}`}
            />

            {viewMode === "week" ? (
                <div style={{ display: "grid", gridTemplateColumns: "56px 1fr" }}>
                    <TimeColumn />
                    <CalendarGrid week={week} onSlotClick={openCreateModal}/>

                    <CreateTaskModal open={isModalOpen} slot={selectedSlot} onClose={closeCreateModal}/>
                </div>
            ) : (
                // <DayView day={day} />
                <DayView day={day} />
            )}

        </div>
    )
}