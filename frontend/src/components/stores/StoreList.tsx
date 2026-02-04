
type Props = {
    stores: any[]
    isLoading: boolean
    error: any
}

const StoreList = ({ stores, isLoading, error }: Props) => {
    if (isLoading) {
        return <div>Loading stores...</div>;
    }

    if (error) {
        return <div>Error loading stores: {error.message}</div>;
    }

    return (
        <div className="container-fluid">
            <div className="table-wrapper has-sticky">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Store Name</th>
                            <th>Region</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((store) => (
                            <tr key={store._id}>
                                <td>{store.name}</td>
                                <td>{store.region}</td>
                                <td>{store.address}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StoreList