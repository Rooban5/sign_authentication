import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupList from '../Signup/SignupList';
import { useAuth } from '../Context/AuthContext'; // Make sure to update the import path

function AdminPage() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const addedby = useAuth().username

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      // Read the username and username1 from the cookie
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        // if (name === 'username1') {
        //   // setUsername1(value); // Remove this line
        // }
        // if (name === 'username') {
        //   // setUsername(value); // Remove this line
        // }
      }

      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="admin-container">
      <div className="background-image"></div>
      <div className="content">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {(addedby) ? (
              <h1>Welcome, Admin {addedby}</h1>
            ) : (
              <h1>Welcome to the Admin Page</h1>
            )}

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            <Link to="/AddUser">
              <button>Add User</button>
            </Link>
            <Link to='/Profile'>Profile</Link>
          </>
        )}
      </div>
      <SignupList />
    </div>
  );
}

export default AdminPage;
