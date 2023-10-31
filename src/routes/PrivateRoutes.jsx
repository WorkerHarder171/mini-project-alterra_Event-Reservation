import { Outlet } from "react-router-dom"
import { authService } from "../config/Auth"
import Unauthorized from "../error/Unauthorized"

export function PrivateRoute() {
    if(authService.isAuthorized()) return <Outlet/>
    return<Unauthorized/>
}