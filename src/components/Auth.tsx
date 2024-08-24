import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useSelector } from "react-redux";

interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
  const { loginWithRedirect } = useAuth0();

  function handleLogin() {
    try {
      loginWithRedirect();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button onClick={() => handleLogin()}>Login</button>
    </>
  );
};

export default Auth;
