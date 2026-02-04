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
            }}
        >
            <div style={{ display: "flex", gap: 0 }}>
                <button
                    onClick={onPrev}
                    style={{
                        borderInline: "1px solid #000",
                        borderRadius: "25px 0 0 25px",
                        padding: "12px",
                        cursor: "pointer",
                        fontSize: "8px",
                        backgroundColor: "#fff",
                    }}
                >◀</button>
                <button
                    onClick={today}
                    style={{
                        borderInline: "1px solid #000",
                        padding: "12px",
                        cursor: "pointer",
                        fontSize: "12px",
                        backgroundColor: "#fff",
                    }}
                >
                    Today</button>
                <button 
                onClick={onNext}
                style={{
                        borderInline: "1px solid #000",
                        borderRadius: "0 25px 25px 0",
                        padding: "12px",
                        cursor: "pointer",
                        fontSize: "8px",
                        backgroundColor: "#fff",
                    }}
                >▶</button>
            </div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            <div style={{ display: "flex", gap: 0 }}>
                <button
                    onClick={() => onViewModeChange("day")}
                    style={{
                        fontWeight: viewMode === "day" ? 700 : 400,
                        borderInline: "1px solid #000",
                        borderRadius: "25px 0 0 25px",
                        padding: "12px",
                        cursor: "pointer",
                        fontSize: "12px",
                        backgroundColor: viewMode === "day" ? "rgb(167, 214, 255)" : "#fff",
                    }}
                >
                    Day
                </button>
                <button
                    onClick={() => onViewModeChange("week")}
                    style={{
                        fontWeight: viewMode === "week" ? 700 : 400,
                        borderInline: "1px solid #000",
                        borderRadius: "0 25px 25px 0",
                        padding: "12px",
                        fontSize: "12px",
                        cursor: "pointer",
                        backgroundColor: viewMode === "week" ? "rgb(167, 214, 255)" : "#fff",
                    }}
                >
                    Week
                </button>
            </div>
        </div>
    )
}