import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  const auth = useAuth();
  return (
    <nav>
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
        {auth.isLoggedInAs(["EMPLOYEE", "ADMIN"]) && (
          <li>
            <NavLink to="/add-showing">Add Showing</NavLink>
          </li>
        )}
        {auth.isLoggedInAs(["EMPLOYEE", "ADMIN"]) && (
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
