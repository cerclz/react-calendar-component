import { useMemo, useState } from "react"
import type { CalendarTask, CreateTaskDto } from "./types"
import { buildCalendarWeek, buildCalendarDay, addDays, getStartOfTheWeek, toLocalISODate } from "./buildCalendar"
import { CalendarHeader } from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import { DayView } from "./DayView"
import { TimeColumn } from "./TimeColumn"
import { getCurrentMonth } from "./date.utils"
import { CreateTaskModal } from "./Task"
import { useGetTasksQuery } from "../../api/tasksApiSlice"

type ViewMode = "day" | "week"
type ModalMode = "create" | "edit"

type Slot = {
    isoDate: string,
    hour: number
}

const EMPTY_TASK: CreateTaskDto = {
    title: "",
    startDate: "",
    endDate: "",
    startHour: 0,
    startMinute: 0,
    endHour: 0,
    endMinute: 0,
    store: "",
    category: "",
    description: ""
}

export function WeeklyCalendar() {
    const [viewMode, setViewMode] = useState<ViewMode>("week")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const [isModalOpen, setIsModalOpen] = useState(false)
    // const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
    // Modal state for create or editing a task
    const [modalMode, setModalMode] = useState<ModalMode>("create")
    // Set the form for the Modal,
    // Change in onTaskEdit if there is from task
    const [taskFormData, setTaskFormData] = useState<CreateTaskDto>(EMPTY_TASK)
    const [selectedTask, setSelectedTask] = useState<CalendarTask | null>(null)

    const selectDayView = (date: Date) => {
        setViewMode("day")
        setSelectedDate(date)
    }

    const openCreateModal = (slot: Slot) => {
        setModalMode("create")
        setSelectedTask(null)
        setTaskFormData((prev) => ({
            ...prev,
            startHour: slot.hour,
            endHour: Math.min(slot.hour + 1, 23),
            startMinute: 0,
            endMinute: 0,
            startDate: slot.isoDate,
            endDate: slot.isoDate
        }))
        setIsModalOpen(true)
    }

    const onCloseModal = () => {
        setIsModalOpen(false)
        setModalMode("create")
        setSelectedTask(null)
        setTaskFormData(EMPTY_TASK)
    }

    const onTaskEdit = (task: CalendarTask) => {
        setModalMode("edit")
        setSelectedTask(task)
        setTaskFormData({
            title: task.title ?? "",
            startDate: task.startDate ?? "",
            endDate: task.endDate ?? "",
            startHour: task.startHour ?? 0,
            startMinute: task.startMinute ?? 0,
            endHour: task.endHour ?? 0,
            endMinute: task.endMinute ?? 0,
            store: task.store ?? "",
            category: task.category ?? "",
            description: task.description ?? "",
        })
        setIsModalOpen(true)
    }

    const today = () => setSelectedDate(new Date())
    const goPrev = () => setSelectedDate(d => (viewMode === "day" ? addDays(d, -1) : addDays(d, -7)))
    const goNext = () => setSelectedDate(d => (viewMode === "day" ? addDays(d, +1) : addDays(d, 7)))

    /**
     * Get Tasks within week range
     */

    const weekStartDate = useMemo(() => getStartOfTheWeek(selectedDate), [selectedDate])
    const weekEndDate = useMemo(() => addDays(weekStartDate, 6), [weekStartDate])

    const from = useMemo(() => toLocalISODate(weekStartDate), [weekStartDate])
    const to = useMemo(() => toLocalISODate(weekEndDate), [weekEndDate])

    const { data: tasks = [], isLoading: tasksLoading, error: tasksError } = useGetTasksQuery({ from, to })

    const week = useMemo(() => buildCalendarWeek(selectedDate, tasks), [selectedDate, tasks])
    const day = useMemo(() => buildCalendarDay(selectedDate, tasks), [selectedDate, tasks])

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <CalendarHeader
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onPrev={goPrev}
                onNext={goNext}
                today={today}
                title={getCurrentMonth(selectedDate.getMonth()) + ` ${selectedDate.getFullYear()}`}
            />

            {viewMode === "week" ? (
                <div style={{ display: "grid", gridTemplateColumns: "56px 1fr" }}>
                    <TimeColumn />
                    <CalendarGrid
                        week={week}
                        onSlotClick={openCreateModal}
                        onTaskClick={onTaskEdit}
                        tasksLoading={tasksLoading}
                        isError={!!tasksError}
                        selectDayView={selectDayView}
                    />
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "56px 1fr" }}>
                    <TimeColumn />
                    <DayView
                        day={day}
                        onSlotClick={openCreateModal}
                        onTaskClick={onTaskEdit}
                        tasksLoading={tasksLoading}
                        isError={!!tasksError}
                    />
                </div>
            )}

            <CreateTaskModal
                open={isModalOpen}
                mode={modalMode}
                selectedTask={selectedTask}
                formData={taskFormData}
                setFormData={setTaskFormData}
                onClose={onCloseModal}
            />
        </div>
    )
}