import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import MovieLayout from "./pages/movies/MovieLayout";
import Login from "./security/Login";
import Logout from "./security/Logout";
import AddShowing from "./pages/showings/AddShowing";
import RequireAuth from "./security/RequireAuth";
import ReservationLayout from "./pages/reservations/ReservationLayout";
import Movie from "./pages/movies/Movie";
import Showings from "./pages/showings/Showings";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import ShowingsForMovie from "./pages/showings/ShowingsForMovie";
import MyReservations from "./pages/reservations/MyReservations";
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
          <Route
            path="/showings"
            element={
              <RequireAuth roles={["ADMIN", "EMPLOYEE"]}>
                <Showings />
              </RequireAuth>
            }
          />{" "}
          <Route path="/showings/:id" element={<ShowingsForMovie />} />
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
            path="/myreservations"
            element={
              <RequireAuth roles={["CUSTOMER"]}>
                <MyReservations />
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
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
