// CalendarHeader.tsx

type ViewMode = "day" | "week"

type Props = {
    title: string
    viewMode: ViewMode
    onViewModeChange: (mode: ViewMode) => void
    onPrev: () => void
    onNext: () => void
    today: () => void
}

export function CalendarHeader({
    title,
    viewMode,
    onViewModeChange,
    onPrev,
    onNext,
    today
}: Props) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "space-between",
                padding: 12,
                border: "1px solid #ddd",
                borderRadius: 12,
            }}
        >
            <div style={{ display: "flex", gap: 8 }}>
                <button onClick={onPrev}>◀</button>
                <button onClick={today}>Today</button>
                <button onClick={onNext}>▶</button>
            </div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            <div style={{ display: "flex", gap: 6 }}>
                <button
                    onClick={() => onViewModeChange("day")}
                    style={{ fontWeight: viewMode === "day" ? 700 : 400 }}
                >
                    Day
                </button>
                <button
                    onClick={() => onViewModeChange("week")}
                    style={{ fontWeight: viewMode === "week" ? 700 : 400 }}
                >
                    Week
                </button>
            </div>
        </div>
    )
}