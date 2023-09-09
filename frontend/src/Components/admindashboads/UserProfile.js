import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function UserProfile() {
  const navigate = useNavigate();
  const { isAuthenticated, username, username1, email, dob, gender, fullname, addedby } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
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
            {(username || username1) && (
              <p>Username: {username || username1}</p>
            )}
            {email && <p>Email: {email}</p>}
            {dob && <p>Date of Birth: {dob}</p>}
            {gender && <p>Gender: {gender}</p>}
            {fullname && <p>Full Name: {fullname}</p>}
            {addedby && <p>Created by: {addedby}</p>}
            {!username && !username1 && (
              <h1>Welcome to the User Profile Page</h1>
            )}
            <Link to='/dashboard'>
              <button>
                Back
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
