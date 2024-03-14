import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const auth = useAuth();

  useEffect(() => {
    auth.signOut();
  }, [auth]);

  return <Navigate to="/" replace={true} />;
}
