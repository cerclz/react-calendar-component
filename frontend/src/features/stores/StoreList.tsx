import { useMemo } from "react"
import { TwoColumn } from "../../layouts/TwoColumn/TwoColumn"
import { Table, type ColumnDef } from "../../components/Table/Table"
import type { Store } from "./stores.types"

type Props = {
    stores: Store[]
    isLoading: boolean
    error: any
}

const StoreList = ({ stores, isLoading, error }: Props) => {
  const columns = useMemo<ColumnDef<Store>[]>(
    () => [
      { header: "Store Name", accessor: "name" },
      { header: "Region", accessor: "region" },
      { header: "Address", accessor: "address" },
      {
        header: "Actions",
        cell: () => (
          <div style={{ display: "flex", gap: 8 }}>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ),
        width: 160,
      },
    ],
    []
  )

  return (
    <TwoColumn
      left={
        <div style={{ display: "grid", gap: 10 }}>
          <button onClick={() => console.log("open create")}>+ Προσθήκη</button>
        </div>
      }
      right={
        <Table
          data={stores}
          columns={columns}
          getRowKey={(s) => s._id}
          isLoading={isLoading}
          error={error}
          emptyText="No stores found"
        />
      }
    />
  )
}

export default StoreList