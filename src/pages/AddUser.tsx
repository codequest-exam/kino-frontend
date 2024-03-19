import { useState } from "react";
import { addUser } from "../services/apiFacade";

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
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
