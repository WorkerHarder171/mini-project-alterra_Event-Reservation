import { Outlet } from "react-router-dom"
import { authService } from "../config/auth"
import Unauthorized from "../error/Unauthorized"

export function PrivateRoute() {
    if(authService.isAuthorized()) return <Outlet/>
    return<Unauthorized/>
}