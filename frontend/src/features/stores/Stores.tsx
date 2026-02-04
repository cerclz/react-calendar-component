import { useGetStoresQuery } from "../../api/storesApiSlice"
import StoreList from "./StoreList"

const Stores = () => {
  const { data: stores = [], isLoading: tasksLoading, error: tasksError } = useGetStoresQuery()
  
  return (
    <StoreList 
      stores={stores}
      isLoading={tasksLoading}
      error={tasksError}
    />
  )
}

export default Stores