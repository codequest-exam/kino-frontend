import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import MovieLayout from "./movies/MovieLayout";
import Cinemas from "./pages/Cinemas";
import Login from "./security/Login";
import Logout from "./security/Logout";
import ShowingForm from "./showings/ShowingForm";
import SeatReservation from "./pages/SeatReservation";
import TicketPurchase from './pages/TicketPurchase'


function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/">
            <Route index element={<MovieLayout />}/>
            <Route path=":movieId" element={<MovieLayout />} />
            </Route>
          <Route path="/cinemas" element={<Cinemas />} />
          <Route path="/reservation" element={<SeatReservation />} />

          <Route
            path="/addShowing"
            element={<ShowingForm />}
            // element={
            //   <RequireAuth roles={["ADMIN"]}>
            //     <RecipeForm />
            //   </RequireAuth>
            // }
          />
          <Route path="/ticketPurchase" element={<TicketPurchase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
