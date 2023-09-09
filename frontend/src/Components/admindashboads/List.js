import React, { useState, useEffect } from "react";
import axios from "axios";
import './admin.css'
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3535/users") // Use the correct API endpoint
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);
  return (
    <div>
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th style={{ border: '2px solid red' }}>Name</th>
            <th style={{ border: '2px solid red' }}>Email</th>
            <th style={{ border: '2px solid red' }}>addedby</th>

            {/* Add other columns for additional fields */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ border: '2px solid red' }}>{user.username}</td>
              <td style={{ border: '2px solid red' }}>{user.email}</td>
              <td style={{ border: '2px solid red' }}>{user.addedby}</td>

              {/* Add additional columns for other fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
