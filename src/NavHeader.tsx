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
        {auth.isLoggedIn() && (
          <li>
            <NavLink to="/add-showing">Add Showing</NavLink>
          </li>
        )}
        <AuthStatus />
        <li>
          <NavLink to="/ticketPurchase">
            <button style={{ display: "flex", alignItems: "center" }}>
              <img
                src="logo.png"
                alt="Logo"
                style={{ width: "20px", marginRight: "5px" }}
              />
              Buy Ticket
            </button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
