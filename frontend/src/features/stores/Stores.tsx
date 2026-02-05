import { useDeleteStoreMutation, useGetStoresQuery } from "./storesApiSlice"
import type { Store } from "./stores.types"
import { TwoColumn } from "../../layouts/TwoColumn/TwoColumn"
import { Table, type ColumnDef } from "../../components/Table/Table"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

const Stores = () => {
  const { data: stores = [], isLoading, error } = useGetStoresQuery()
  const navigate = useNavigate()

  const [deleteStore, { isLoading: deleteLoading, isError: deleteError }] = useDeleteStoreMutation()

  const deleteStoreHandler = async (id: string) => {
    try {
      const ok = window.confirm("Delete Store?")
      if (!ok) return
      await deleteStore({ id }).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  const columns = useMemo<ColumnDef<Store>[]>(
    () => [
      { header: "Store Name", accessor: "name" },
      { header: "Region", accessor: "region" },
      { header: "Address", accessor: "address" },
      {
        header: "Actions",
        cell: (row) => (
          <div style={{ display: "flex", gap: 8 }}>
            <button>Edit</button>
            <button onClick={() => deleteStoreHandler(row._id)} disabled={deleteLoading} >Delete</button>
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
          <button onClick={() => navigate('/stores/create')}>+ Προσθήκη</button>
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

export default Stores