import { Outlet } from "react-router-dom"
import { Header } from "../../components/header/Header"

const MainLayout = () => {
    return (
        <>
            <Header
                title="CalendarApp"
                items={[
                    { to: "/", label: "Calendar" },
                    { to: "/stores", label: "Stores" },
                ]}
            />

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout