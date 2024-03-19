import { useEffect, useState } from "react";
import { User, editUserRole, getUsers, removeUserRole } from "../services/apiFacade";

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
  console.log(users);

  const userTableRows = users.map((user) => (
    <tr key={user.userName}>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.roleNames.join(" ")}</td>
      <td>
        <label>
          <input type="checkbox" checked={user.roleNames.includes("ADMIN")} onChange={() => handleRoleChange("ADMIN", user)} />
          Admin
        </label>
        <label>
          <input type="checkbox" checked={user.roleNames.includes("EMPLOYEE")} onChange={() => handleRoleChange("EMPLOYEE", user)} />
          Employee
        </label>
        <label>
          <input type="checkbox" checked={user.roleNames.includes("CUSTOMER")} onChange={() => handleRoleChange("CUSTOMER", user)} />
          Customer
        </label>
      </td>
    </tr>
  ));

  const handleRoleChange = (role: string, user: User) => {
    if (user.roleNames.includes(role)) {
      removeUserRole(user.userName, role)
        .then((updatedUser) => {
          setUsers(users.map((u) => (u.userName === updatedUser.userName ? updatedUser : u)));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      editUserRole(user.userName, role)
        .then((updatedUser) => {
          setUsers(users.map((u) => (u.userName === updatedUser.userName ? updatedUser : u)));
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
