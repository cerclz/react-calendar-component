// types.ts
// Calenader component types

export type CalendarTask = {
    id: string
    title: string
    startDate: string
    endDate: string
    startHour: number
    startMinute: number 
    endHour: number 
    endMinute: number
    store: string
    category: string
    comments: string
}

export type CalendarDay = {
  date: Date
  isoDate: string
  tasks: CalendarTask[]
}

export type CalendarWeek = {
  range: { start: Date; end: Date }
  days: CalendarDay[]
}