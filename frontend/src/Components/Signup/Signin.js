import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './signin.css'; // Import your CSS file for additional styling
import Forgotpassword from '../Forgot/Forgotpassword';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [accountLockedMessage, setAccountLockedMessage] = useState("");
  const { login, username ,username1} = useAuth(); // Include username from useAuth
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        setAccountLockedMessage(errorMessage);
      }
    }
  };

  const handleForgotPasswordClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="admin-login-form">
      <div className="login-form-content">
        <Typography variant="h5" style={{color:'skyblue',textAlign:'center'}}>Signin</Typography>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={handleForgotPasswordClick}
          fullWidth
          sx={{ marginTop: 1 }}
        >
          Forgot password
        </Button>
        {accountLockedMessage && (
          <p className="error-message" style={{ color: 'red', marginTop: '8px' }}>{accountLockedMessage}</p>
        )}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {/* Your forgot password form content */}
            <Forgotpassword />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminLoginForm;
