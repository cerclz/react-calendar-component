// calendarConfig.ts

export const START_HOUR = 0
export const END_HOUR = 24

export const TOTAL_SLOTS = END_HOUR - START_HOUR

export const HEADER_HEIGHT = 72
export const SLOT_HEIGHT = 64
export const PX_PER_MINUTE = SLOT_HEIGHT / 60

export const GRID_ROWS = `${HEADER_HEIGHT}px repeat(${TOTAL_SLOTS}, ${SLOT_HEIGHT}px)`
