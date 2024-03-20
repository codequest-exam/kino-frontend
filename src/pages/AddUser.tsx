import { useState } from "react";
import { addUser } from "../services/apiFacade";
import "./addUser.css";

export default function AddUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUser(email, username, password)
      .then(() => {
        setMessage("User added");
        setEmail("");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        setMessage(`Error adding user: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Sign up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
