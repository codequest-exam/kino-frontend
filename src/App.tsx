import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import MovieLayout from "./pages/movies/MovieLayout";
import Cinemas from "./pages/Cinemas";
import Login from "./security/Login";
import Logout from "./security/Logout";
import AddShowing from "./pages/showings/AddShowing";
import SeatReservation from "./pages/SeatReservation";
import TicketPurchase from "./pages/TicketPurchase";
import RequireAuth from "./security/RequireAuth";
import ReservationLayout from "./pages/reservations/ReservationLayout";
import Movie from "./pages/movies/Movie";
import Showings from "./pages/showings/Showings";
import Checkout from "./pages/Checkout";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import "./app.css";

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
          />{" "}
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/add-showing"
            element={
              <RequireAuth roles={["ADMIN", "EMPLOYEE"]}>
                <AddShowing />
              </RequireAuth>
            }
          />
          <Route
            path="/reservations"
            element={
              <RequireAuth roles={["ADMIN", "EMPLOYEE"]}>
                <ReservationLayout />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth roles={["ADMIN"]}>
                <Users />
              </RequireAuth>
            }
          />
          <Route path="/users/add" element={<AddUser />} />
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
