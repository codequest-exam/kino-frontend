import "./app.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Cinemas from "./pages/Cinemas";
import Login from "./security/Login";
import Logout from "./security/Logout";
import ShowingForm from "./showings/ShowingForm";
import SeatReservation from "./pages/SeatReservation";
import TicketPurchase from "./pages/TicketPurchase";
import RequireAuth from "./security/RequireAuth";
import AllReservations from "./pages/AllReservations";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/" element={<Movies />} />
          <Route path="/cinemas" element={<Cinemas />} />
          <Route path="/reservation" element={<SeatReservation />} />

          <Route
            path="/add-showing"
            element={
              <RequireAuth roles={["ADMIN", "USER"]}>
                <ShowingForm />
              </RequireAuth>
            }
          />
          <Route
            path="/reservations"
            element={
              <RequireAuth roles={["ADMIN", "USER"]}>
                <AllReservations />
              </RequireAuth>
            }
          />
          <Route path="/ticket-purchase" element={<TicketPurchase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
