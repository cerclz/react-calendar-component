import type { ReactNode } from "react"

export type ColumnDef<T> = {
  header: ReactNode
  accessor?: keyof T
  cell?: (row: T) => ReactNode
  width?: string | number
}

type Props<T> = {
  data: T[]
  columns: ColumnDef<T>[]
  getRowKey: (row: T) => string
  isLoading?: boolean
  error?: unknown
  emptyText?: string
}

export function Table<T>({
  data,
  columns,
  getRowKey,
  isLoading,
  error,
  emptyText = "No results",
}: Props<T>) {
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong.</div>

  return (
    <div className="table-outer">
      <div className="table-scroll has-sticky">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} style={col.width ? { width: col.width } : undefined}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: 14 }}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={getRowKey(row)}>
                  {columns.map((col, i) => {
                    const content =
                      col.cell ? col.cell(row) : col.accessor ? (row as any)[col.accessor] : null
                    return <td key={i}>{content}</td>
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
