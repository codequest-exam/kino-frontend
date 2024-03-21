import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";
import "./navbar.css";

export default function NavHeader() {
  const auth = useAuth();
  return (
    <nav className="navbar navbar-style">
      <ul className="navbar-list">
        <li className="navbar-logo">
          <img src="cinemalogo.png" style={{ width: "100px" }} />
        </li>
        <div className="navbar-items">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          {!auth.isLoggedIn() && (
            <li>
              <NavLink to="/users/add">Sign up</NavLink>
            </li>
          )}
          {auth.isLoggedInAs(["ADMIN"]) && (
            <li>
              <NavLink to="/showings">Showings</NavLink>
            </li>
          )}
          {auth.isLoggedInAs(["EMPLOYEE", "ADMIN"]) && (
            <li>
              <NavLink to="/reservations">Reservations</NavLink>
            </li>
          )}
          {auth.isLoggedInAs(["ADMIN"]) && (
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
          )}
          {auth.isLoggedInAs(["CUSTOMER"]) && (
            <li>
              <NavLink to="/myreservations">My Reservations</NavLink>
            </li>
          )}
          <AuthStatus />
          <li>
            <NavLink to="/movies">
              <button className="buy-ticket" style={{ display: "flex", alignItems: "center" }}>
                <img src="logo.png" alt="Logo" style={{ width: "20px", marginRight: "5px" }} />
                Buy Ticket
              </button>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
