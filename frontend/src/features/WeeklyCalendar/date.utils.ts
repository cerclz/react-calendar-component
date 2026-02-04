// date.utils.ts

export function getCurrentMonth(m: number) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    return months[m]
}

export function getCurrentDay(d: number) {
    const months = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return months[d]
}

export function isToday(d: Date) {
    const today = new Date()
    const todayFormatted = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`
    const dFormatted = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`

    if (todayFormatted == dFormatted) {
        return true
    }
}