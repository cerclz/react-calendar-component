import { useMemo, useState } from "react"
import type { CalendarTask, CreateTaskDto } from "./types"
import { buildCalendarWeek, buildCalendarDay, addDays, getStartOfTheWeek, toLocalISODate } from "./buildCalendar"
import { CalendarHeader } from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import { DayView } from "./DayView"
import { TimeColumn } from "./TimeColumn"
import { getCurrentMonth } from "./date.utils"
import { CreateTaskModal } from "./CreateTaskModal"
import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../../api/tasksApiSlice"

type ViewMode = "day" | "week"

type Slot = {
    isoDate: string,
    hour: number
}

type ModalMode = "create" | "edit"

const EMPTY_TASK: CreateTaskDto = {
    title: "",
    startDate: "",
    endDate: "",
    startHour: 0,
    startMinute: "00",
    endHour: 0,
    endMinute: "00",
    store: '',
    category: "",
    comments: ""
}

const NUM_FIELDS = new Set(["startHour", "startMinute", "endHour", "endMinute"])

export function WeeklyCalendar() {

    const [viewMode, setViewMode] = useState<ViewMode>("week")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

    // Modal state for create or editing a task
    const [modalMode, setModalMode] = useState<ModalMode>("create")

    // Set the form for the Modal,
    // Change in onTaskEdit if there is from task
    const [taskFormData, setTaskFormData] = useState<CreateTaskDto>(EMPTY_TASK)
    const [selectedTask, setSelectedTask] = useState<CalendarTask | null>(null)

    const openCreateModal = (slot: Slot) => {
        setSelectedSlot(slot)
        setModalMode("create")
        setTaskFormData({
            ...taskFormData,
            startHour: slot.hour,
            endHour: slot.hour + 1,
            startDate: slot.isoDate,
            endDate: slot.isoDate
        })
        setIsModalOpen(true)
    }

    const onCloseModal = () => {
        setIsModalOpen(false)
        setSelectedSlot(null)
        setTaskFormData(EMPTY_TASK)
        setSelectedTask(null)
    }

    const onTaskEdit = (task: CalendarTask) => {
        setIsModalOpen(true)
        setModalMode("edit")
        setTaskFormData(task)
        setSelectedTask(task)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setTaskFormData(prev => ({
            ...prev,
            [name]: NUM_FIELDS.has(name) ? Number(value) : value

        }))
    }

    const today = () => setSelectedDate(new Date())

    // Go prev day if view mode is day else go prev week
    const goPrev = () => setSelectedDate(d => (viewMode === "day" ? addDays(d, -1) : addDays(d, -7)))

    // Go next day if view mode is day else go next week
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

    /**
     * Create New Task Implementation
     */
    const [createTask, { isLoading, error }] = useCreateTaskMutation()

    const onSubmit = async () => {
        try {
            await createTask(taskFormData).unwrap()
            onCloseModal()
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * Update Task Implementation
     */

    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation()

    const onUpdate = async () => {
        if (!selectedTask?._id) return

        await updateTask({ id: selectedTask._id, body: taskFormData }).unwrap()
        onCloseModal()
    }


    /** 
     * Delete Task Implementation 
     */

    const [deleteTask, { isLoading: deleteLoading, error: deleteError }] = useDeleteTaskMutation()

    const onDelete = async () => {
        try {
            if (!selectedTask?._id) return

            // optional confirm
            const ok = window.confirm("Delete Task?")
            if (!ok) return

            await deleteTask({ id: selectedTask._id }).unwrap()
            onCloseModal()
        } catch (e) {
            console.error(e)
        }
    }


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
                    <CalendarGrid
                        week={week}
                        onSlotClick={openCreateModal}
                        onTaskClick={onTaskEdit}
                        tasksLoading={tasksLoading}
                        isError={!!tasksError}
                    />

                    <CreateTaskModal
                        open={isModalOpen}
                        slot={selectedSlot}
                        onClose={onCloseModal}
                        mode={modalMode}
                        formData={taskFormData}
                        handleChange={handleChange}
                        onSubmit={onSubmit}
                        isSaving={isLoading}
                        isUpdating={isUpdating}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        isDeleting={deleteLoading}
                        isError={!!error}
                    />
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "56px 1fr" }}>
                    <TimeColumn />
                    <DayView day={day} onSlotClick={openCreateModal} onTaskClick={onTaskEdit} />

                    <CreateTaskModal
                        open={isModalOpen}
                        slot={selectedSlot}
                        onClose={onCloseModal}
                        mode={modalMode}
                        formData={taskFormData}
                        handleChange={handleChange}
                        onSubmit={onSubmit}
                        isUpdating={isUpdating}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        isDeleting={deleteLoading}
                        isSaving={isLoading}
                        isError={!!error}
                    />

                </div>
            )}

        </div>
    )
}