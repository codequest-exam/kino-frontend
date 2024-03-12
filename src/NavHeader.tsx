import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
// import React from "react";
// import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
//   const auth = useAuth();
  return (
    <nav>
      <ul>
        <li>
          {/* <a href="/">Home</a> */}
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/cinemas">Cinemas</NavLink>
        </li>
        {/* {auth.isLoggedIn() && ( */}
          <li>
            <NavLink to="/addShowing">Add Showing</NavLink>
          </li>
        {/* )} */}
        <AuthStatus />
      </ul>
    </nav>
  );
}
