// types.ts
// Calenader component types

export type CalendarTask = {
    _id: string
    title: string
    startDate: string
    endDate: string
    startHour: number
    startMinute: string 
    endHour: number 
    endMinute: string
    store: string
    category: string
    description: string
}

export type CreateTaskDto = Omit<CalendarTask, "_id">

export type CalendarDay = {
  date: Date
  isoDate: string
  tasks: CalendarTask[]
}

export type CalendarWeek = {
  range: { start: Date; end: Date }
  days: CalendarDay[]
}