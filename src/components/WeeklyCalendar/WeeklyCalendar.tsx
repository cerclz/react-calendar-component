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

type ModalMode = "create" | "edit"

const EMPTY_TASK: CalendarTask = {
    id: "",
    title: "",
    date: "",
    start: 0,
    startM: 0,
    end: 0,
    endM: 0,
    category: "",
    comments: ""
}

export function WeeklyCalendar({ tasks }: Props) {

    const [viewMode, setViewMode] = useState<ViewMode>("week")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

    // Modal state for create or editing a task
    const [modalMode, setModalMode] = useState<ModalMode>("create")

    // Set the form for the Modal,
    // Change in onTaskEdit if there is from task
    const [taskFormData, setTaskFormData] = useState<CalendarTask>(EMPTY_TASK)

    const openCreateModal = (slot: Slot) => {
        setSelectedSlot(slot)
        setModalMode("create")
        setTaskFormData({
            ...taskFormData,
            start: slot.hour,
            end: slot.hour + 1,
            date: slot.isoDate
        })
        setIsModalOpen(true)
    }

    const onCloseModal = () => {
        setIsModalOpen(false)
        setSelectedSlot(null)
        setTaskFormData(EMPTY_TASK)
    }

    const onTaskEdit = (task: CalendarTask) => {
        setIsModalOpen(true)
        setModalMode("edit")
        setTaskFormData(task)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        setTaskFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))
    }

    const week = useMemo(() => buildCalendarWeek(selectedDate, tasks), [selectedDate, tasks])
    const day = useMemo(() => buildCalendarDay(selectedDate, tasks), [selectedDate, tasks])

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
                    <CalendarGrid week={week} onSlotClick={openCreateModal} onTaskClick={onTaskEdit} />

                    <CreateTaskModal open={isModalOpen} slot={selectedSlot} onClose={onCloseModal} mode={modalMode} formData={taskFormData} handleChange={handleChange} />
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "56px 1fr" }}>
                    <TimeColumn />
                    <DayView day={day} onSlotClick={openCreateModal} onTaskClick={onTaskEdit}/>

                    <CreateTaskModal open={isModalOpen} slot={selectedSlot} onClose={onCloseModal} mode={modalMode} formData={taskFormData} handleChange={handleChange} />

                </div>
            )}

        </div>
    )
}