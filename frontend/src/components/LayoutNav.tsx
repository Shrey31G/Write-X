import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export const LayoutNav = ({ isAuthenticated, setIsAuthenticated}: { isAuthenticated: boolean, setIsAuthenticated: (value: boolean) => void}) => {
    return (
        <div>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
                <Outlet />
        </div>
    )
}