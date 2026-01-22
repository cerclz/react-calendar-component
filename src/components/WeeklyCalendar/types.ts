// types.ts
// Calenader component types

export type CalendarTask = {
    id: string
    title: string
    date: string
    start: number
    startM: number 
    end: number 
    endM: number
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