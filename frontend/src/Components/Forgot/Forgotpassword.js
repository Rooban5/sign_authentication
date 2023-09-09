import React, { useState } from 'react';
import axios from 'axios';
import './Forgotpassword.css'; // Import your CSS file for additional styling
import { useDispatch } from "react-redux";
import { sendPasswordResetEmail } from "../../Slice/UserSlice";
function Forgotpassword() {
  const [email, setEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const dispatch = useDispatch();

  const handleReset = (e) => {
    e.preventDefault();

    dispatch(sendPasswordResetEmail(email));
  };

  return (
    <div className="forgot-password-container">
      <h1>Password Reset</h1>
      <form onSubmit={handleReset} className="forgot-password-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{resetMessage}</p>
    </div>
  );
}

export default Forgotpassword;
