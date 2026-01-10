// time.utils.ts
// helper functions for grid placement

export function getTaskDurationInMinutes(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / 60000
}
