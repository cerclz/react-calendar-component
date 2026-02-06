import { useMemo, useState } from "react";
import { useCreateStoreMutation, useGetStoresQuery, useUpdateStoreMutation } from "../stores/storesApiSlice";
import type { CalendarTask, CreateTaskDto } from "./types";
import TaskForm from "./TaskForm";
import { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from "../../api/tasksApiSlice";
import type { CreateStoreDto } from "../stores/stores.types";

type FormEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
const NUM_FIELDS = new Set(["startHour", "startMinute", "endHour", "endMinute"])

const EMPTY_NEW_STORE: CreateStoreDto = {
    name: "",
    region: "",
    address: "",
    contactDetails: { contactName: "", email: "", phone: "" },
    comments: [""],
}

type Props = {
    open: boolean
    mode: "create" | "edit"
    selectedTask: CalendarTask | null
    formData: CreateTaskDto
    setFormData: React.Dispatch<React.SetStateAction<CreateTaskDto>>
    onClose: () => void
}

export function CreateTaskModal({
    open,
    mode,
    selectedTask,
    formData,
    setFormData,
    onClose
}: Props) {
    // Get StoreName for the Datalist
    const { data: stores = [], isLoading: storesLoading, error: storesError } = useGetStoresQuery()
    const storeNames = useMemo(() => stores.map((store) => store.name).filter(Boolean), [stores])

    const isEdit = mode == "edit"
    const storeExists = !!formData.store && storeNames.includes(formData.store)
    const isNewStore = !!formData.store && !storeExists

    const [newStoreData, setNewStoreData] = useState<CreateStoreDto>(EMPTY_NEW_STORE)

    const newStoreDataWithName: CreateStoreDto = isNewStore
        ? { ...newStoreData, name: formData.store }
        : newStoreData

    const handleChange = (e: React.ChangeEvent<FormEl>) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: NUM_FIELDS.has(name) ? Number(value) : value

        }))
    }

    const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const { name, value } = e.currentTarget
        setFormData(p => ({ ...p, [name]: value }))
    }

    const onNewStoreChange = (e: React.ChangeEvent<FormEl>) => {
        const { name, value } = e.target

        setNewStoreData(prev => ({
            ...prev,
            [name]: value

        }))
    }

    // Mutations
    const [createStore, createStoreState] = useCreateStoreMutation()
    const [updateStore, updateStoreState] = useUpdateStoreMutation()
    const [createTask, createTaskState] = useCreateTaskMutation()
    const [updateTask, updateTaskState] = useUpdateTaskMutation()
    const [deleteTask, deleteTaskState] = useDeleteTaskMutation()

    const saveError = createTaskState.error || updateTaskState.error || createStoreState.error || updateStoreState.error
    const isSaving = createTaskState.isLoading || updateTaskState.isLoading || createStoreState.isLoading || updateStoreState.isLoading

    const onSave = async () => {
        try {
            const typedStoreName = formData.store?.trim()
            const description = formData.description?.trim()

            if (typedStoreName) {
                const existingStore = stores.find((s) => s.name === typedStoreName)

                if (existingStore) {
                    const nextComments = description
                        ? [...(existingStore.comments ?? []), description]
                        : existingStore.comments ?? []

                    await updateStore({
                        id: existingStore._id,
                        body: {
                            name: existingStore.name,
                            region: existingStore.region,
                            address: existingStore.address,
                            contactDetails: existingStore.contactDetails,
                            comments: nextComments,
                        },
                    }).unwrap()
                } else {
                    await createStore({
                        ...newStoreDataWithName,
                        name: typedStoreName,
                        comments: description ? [description] : [],
                    }).unwrap()
                }
            }

            if (isEdit) {
                if (!selectedTask?._id) return
                await updateTask({ id: selectedTask._id, body: formData }).unwrap()
            } else {
                await createTask(formData).unwrap()
            }

            onClose()
        } catch (e) {
            console.error(e)
        }
    }


    const onDelete = async () => {
        try {
            if (!selectedTask?._id) return
            const ok = window.confirm("Delete Task?")
            if (!ok) return
            await deleteTask({ id: selectedTask._id }).unwrap()
            onClose()
        } catch (e) {
            console.error(e)
        }
    }

    const modalTitle = isEdit ? formData.title || "Edit Task" : "New Task"

    return (
        <TaskForm
            open={open}
            title={modalTitle}
            isEdit={isEdit}
            formData={formData}
            onChange={handleChange}
            onTextAreaChange={handleTextAreaChange}
            onClose={onClose}
            onDelete={isEdit ? onDelete : undefined}
            onSave={onSave}
            isSaving={isSaving}
            saveError={saveError}
            isDeleting={deleteTaskState.isLoading}
            deleteError={deleteTaskState.error}
            storeNames={storeNames}
            storesLoading={storesLoading}
            storesError={storesError}
            isNewStore={isNewStore}
            newStoreData={newStoreDataWithName}
            onNewStoreChange={onNewStoreChange}
        />
    )
}