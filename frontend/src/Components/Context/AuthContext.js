import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Helper function to set a cookie
const setCookie = (name, value, days) => {
  const expirationDate = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expirationDate}; path=/`;
};

// Helper function to retrieve a cookie by name
const getCookie = (name) => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

// Helper function to remove a cookie by name
const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(getCookie("username") || null);
  // const [username1, setUsername1] = useState(getCookie("username1") || null);
  const [email, setEmail] = useState(getCookie("email") || null);
  const [dob, setDOB] = useState(getCookie("dob") || null);
  const [gender, setGender] = useState(getCookie("gender") || null);
  const [fullname, setFullname] = useState(getCookie("fullname") || null);
  const [addedby, setAddedby] = useState(getCookie("addedby") || null);
  const [authToken, setAuthToken] = useState(sessionStorage.getItem("authToken") || null);
  const isAuthenticated = !!authToken;
  const [sessionTimeout, setSessionTimeout] = useState(0);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3535/login", {
        email,
        password,
      });

      const fetchedUsername = response.data.username;
      // const fetchedUsername1 = response.data.username1;

      setCookie("username", fetchedUsername, 7);
      // setCookie("username1", fetchedUsername1, 7);
      setCookie("email", response.data.email, 7);
      setCookie("dob", response.data.dob, 7);
      setCookie("gender", response.data.gender, 7);
      setCookie("fullname", response.data.fullname, 7);
      setCookie("addedby", response.data.addedby, 7);

      const Timing = response.data.sessionTimeout;
      setSessionTimeout(Timing);

      const token = response.data.token;
      setAuthToken(token);

      setUsername(fetchedUsername);
      // setUsername1(fetchedUsername1);

      // Store sessionTimeout in localStorage
      localStorage.setItem("sessionTimeout", Timing);

      sessionStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Propagate the error to the calling component
    }
  };

  const logout = () => {
    setAuthToken(null);

    const cookieNames = ["username", "email", "dob", "gender", "fullname", "addedby"];
    cookieNames.forEach((cookieName) => {
      removeCookie(cookieName);
    });

    // Clear sessionTimeout from localStorage on logout
    localStorage.removeItem("sessionTimeout");
    sessionStorage.removeItem("authToken");
  };

  useEffect(() => {
    if (isAuthenticated && sessionTimeout > 0) {
      const timeout = setTimeout(() => {
        logout();
      }, sessionTimeout * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, sessionTimeout]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        username,
        // username1,
        email,
        dob,
        gender,
        fullname,
        addedby,
        login,
        logout,
        isAuthenticated,
        setUsername, // Include setUsername in the context value
        // setUsername1, // Include setUsername1 in the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
