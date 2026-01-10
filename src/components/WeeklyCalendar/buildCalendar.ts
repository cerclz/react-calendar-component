// buildCalendarWeek.ts
import type { CalendarTask, CalendarWeek, CalendarDay } from "./types";

// Convert to local Date
function pad2(n: number) {
    return String(n).padStart(2, "0")
}

export function toLocalISODate(d: Date): string {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

// Get first day of the week
// Always Monday

export function getStartOfTheWeek(anchor: Date): Date {
    const date = new Date(anchor)
    date.setHours(0, 0, 0, 0)

    // get current day
    const day = date.getDay()
    // find distance from monday
    const distance = (day + 6) % 7

    date.setDate(date.getDate() - distance)

    return date
}

// add days to the weeek
export function addDays(date: Date, days: number): Date {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    return d
}


// Build Calendar Day with Tasks
export function buildCalendarDay(date: Date, tasks: CalendarTask[]): CalendarDay {
    // conver time to local time
    const isoDate = toLocalISODate(date)

    // sort day tasks
    const dayTasks = tasks
        .filter(t => t.date === isoDate)
        .slice()
        .sort((a, b) => a.start - b.start)

    return {
        date: new Date(date),
        isoDate,
        tasks: dayTasks,
    }
}

export function buildCalendarWeek(anchorDate: Date, tasks: CalendarTask[]): CalendarWeek {
    const start = getStartOfTheWeek(anchorDate)
    const end = addDays(start, 6)

    // Group Tasks by date using Map
    const tasksByDate = new Map<string, CalendarTask[]>()
    for (let task of tasks) {
        const key = task.date
        const arr = tasksByDate.get(key)

        if (arr) arr.push(task)
        else tasksByDate.set(key, [task])
    }

    // build the rest of the days starting from Monday
    const days: CalendarDay[] = []
    for (let i = 0; i < 7; i++) {
        const date = addDays(start, i)
        const isoDate = toLocalISODate(date)

        const dayTasks = (tasksByDate.get(isoDate) ?? []).slice()
        dayTasks.sort((a, b) => a.start - b.start)

        days.push({ date, isoDate, tasks: dayTasks })
    }

    return {
        range: { start, end },
        days
    }
}

