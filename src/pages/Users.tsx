import { useEffect, useState } from "react";
import { User, editUserRole, getUsers } from "../services/apiFacade";

export default function Users() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res);
        setLoading(false);
      })
      .catch(() => setError("Error fetching users, the server might be down."));
  }, []);

  const userTableRows = users.map((user) => (
    <tr key={user.username}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.roles?.join(", ")}</td>
      <td>
        <select value={user.roles} onChange={(e) => handleRoleChange(e, user)}>
          <option value="">None</option>
          <option value="ADMIN">Admin</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="CUSTOMER">Customer</option>
        </select>{" "}
      </td>
    </tr>
  ));
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>, user: User) => {
    const newRole = e.target.value;
    console.log("newRole", newRole);

    if (newRole) {
      editUserRole(user.username, newRole)
        .then((updatedUser) => {
          setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>{userTableRows}</tbody>
      </table>
    </div>
  );
}
