import { Outlet, Navigate } from "react-router-dom"
import { authService } from "../config/auth"


export function ProtectedRoutes() {
    if(!authService.isAuthorized()) return <Outlet/>
    return <Navigate to="/" />
}
