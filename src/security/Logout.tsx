// import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import * as React from "react";

export default function Logout() {
//   const auth = useAuth();
//   auth.signOut();
  return <Navigate to="/" replace={true} />;
}
