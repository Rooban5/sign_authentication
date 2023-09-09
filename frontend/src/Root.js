import React from "react";
import { AuthProvider } from "./Components/Jwt/AuthCOntext";
import App from "./App";

const Root = () => {
  return (
    <AuthProvider>
      <App/>
    </AuthProvider>
  );
};

export default Root;
