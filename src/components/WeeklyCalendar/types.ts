// types.ts
// Calenader component types

export type CalendarTask = {
    id: string
    title: string
    date: string
    start: number // HH:MM convertion to number
    end: number // HH:MM convertion to number
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

export type TimeColumnProps = {
  startHour?: number
  endHour?: number
  stepMinutes?: number
}