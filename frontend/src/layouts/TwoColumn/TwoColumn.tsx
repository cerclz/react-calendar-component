import './twoColumn.css';

import type { ReactNode } from "react"

type Props = {
  left: ReactNode
  right: ReactNode
  leftWidth?: number // px
  gap?: number       // px
}

export const TwoColumn = ({
  left,
  right,
  leftWidth = 280,
  gap = 16,
}: Props) => {
  return (
    <div
      className="two-col"
      style={
        {
          ["--left" as any]: `${leftWidth}px`,
          ["--gap" as any]: `${gap}px`,
        } as React.CSSProperties
      }
    >
      <aside className="two-col-left">{left}</aside>
      <main className="two-col-right">{right}</main>
    </div>
  )
}