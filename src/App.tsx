import "./app.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import MovieLayout from "./movies/MovieLayout";
import Cinemas from "./pages/Cinemas";
import Login from "./security/Login";
import Logout from "./security/Logout";
import ShowingForm from "./showings/ShowingForm";
import SeatReservation from "./pages/SeatReservation";
import TicketPurchase from "./pages/TicketPurchase";
import RequireAuth from "./security/RequireAuth";
import AllReservations from "./pages/AllReservations";
import Movie from "./movies/Movie";
import Showings from "./pages/Showings";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/">
            <Route index element={<MovieLayout />} />
            <Route path=":id" element={<Movie />} />
          </Route>
          <Route path="/cinemas" element={<Cinemas />} />
          <Route path="/reservation" element={<SeatReservation />} />
          <Route
            path="/showings"
            element={
              <RequireAuth roles={["ADMIN", "EMPLOYEE"]}>
                <Showings />
              </RequireAuth>
            }
          />
          <Route
            path="/add-showing"
            element={
              <RequireAuth roles={["ADMIN", "EMPLOYEE"]}>
                <ShowingForm />
              </RequireAuth>
            }
          />
          <Route
            path="/reservations"
            element={
              <RequireAuth roles={["ADMIN", "EMPLOYEE"]}>
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
