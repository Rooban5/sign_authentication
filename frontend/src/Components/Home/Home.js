import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../Signup/Signin';
import SignUp from '../Signup/Signup';
import Popup from './Popup'; // Make sure the path to Popup.js is correct
import './Home.css';

const Home = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <Link to="/">
          <span style={{ color: 'white', cursor: 'pointer' }}>Home</span>
        </Link>
        <span style={{ color: 'white', cursor: 'pointer' }} onClick={openSignInModal}>
          Signin
        </span>
        <span style={{ color: 'white', cursor: 'pointer' }} onClick={openSignUpModal}>
          Signup
        </span>
      </nav>

      <div className="content-container">
        <h1>Welcome to Our Website</h1>
        <p>This is the homepage of our website. Feel free to explore!</p>
        <p>Click the "Signin" or "Signup" links above to open the respective modals.</p>
      </div>

      {/* Render the popups */}
      {isSignInModalOpen && (
        <Popup title="Signin" onClose={closeSignInModal}>
          <SignIn />
        </Popup>
      )}
      {isSignUpModalOpen && (
        <Popup title="Signup" onClose={closeSignUpModal}>
          <SignUp />
        </Popup>
      )}
    </div>
  );
};

export default Home;
