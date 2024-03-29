import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "./login.css";

const Login: React.FC = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await auth.signIn(user);
      navigate(from, { replace: true });
      setLoading(false);
    } catch (error) {
      setError("Incorrect username or password");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div className="login-form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={user.username} onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))} required />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={user.password} onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} required />
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
