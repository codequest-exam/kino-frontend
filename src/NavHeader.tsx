import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  const auth = useAuth();
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, paddingTop: "20px", boxShadow: "0 4px 8px" }}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/cinemas">Cinemas</NavLink>
        </li>
        <li>
          <NavLink to="/reservation">Seat Reservation</NavLink>
        </li>
        {auth.isLoggedInAs(["USER", "ADMIN"]) && (
          <li>
            <NavLink to="/add-showing">Add Showing</NavLink>
          </li>
        )}
        {auth.isLoggedInAs(["USER", "ADMIN"]) && (
          <li>
            <NavLink to="/reservations">See all reservations</NavLink>
          </li>
        )}
        <AuthStatus />
        <li>
          <NavLink to="/ticket-purchase">
            <button style={{ display: "flex", alignItems: "center" }}>
              <img src="logo.png" alt="Logo" style={{ width: "20px", marginRight: "5px" }} />
              Buy Ticket
            </button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
