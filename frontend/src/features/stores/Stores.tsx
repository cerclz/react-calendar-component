import { useCreateStoreMutation, useGetStoresQuery } from "./storesApiSlice"
import type { CreateStoreDto, Store } from "./stores.types"
import { TwoColumn } from "../../layouts/TwoColumn/TwoColumn"
import { Table, type ColumnDef } from "../../components/Table/Table"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

const Stores = () => {
  const { data: stores = [], isLoading, error } = useGetStoresQuery()

  const navigate = useNavigate()

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