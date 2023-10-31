// import react-router-dom v6
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import from pages
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import FormEditAdmin from "../pages/FormEditAdmin";
import DashboardAdmin from "../pages/DashboardAdmin";
import FormReservation from "../pages/FormReservation";
import FormCreateEventAdmin from "../pages/FormCreateEventAdmin";
import SignUp from "../pages/Register";
import EventDetails from "../pages/EventDetails";
import { PrivateRoute } from "./PrivateRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import ErrorNotFound from "./../error/NotFound";
import Unauthorized from "../error/Unauthorized";
import LogoutSession from "../error/LogoutSession";
function NavRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/form-reservation" element={<FormReservation />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route path="/form-edit-admin/:id" element={<FormEditAdmin />} />
          <Route path="/create-event" element={<FormCreateEventAdmin />} />
        </Route>

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/logoutsession" element={<LogoutSession />} />
        </Route>

        <Route path="*" element={<ErrorNotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavRoutes;
