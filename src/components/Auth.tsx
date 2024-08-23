import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useSelector } from "react-redux";

interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
  const { loginWithRedirect, logout } = useAuth0();
  const userId = useSelector((state: any) => state.userId);
  const name = useSelector((state: any) => state.name);
  console.log("userid", "name", userId, name);
  function handleLogin() {
    try {
      loginWithRedirect();
    } catch (error) {
      console.error(error);
    }
  }

  if (userId) {
    //maybe add a modal here to show account info or only allow logout from settings page
    return (
      <>
        <button onClick={() => logout()}>Logout</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => handleLogin()}>Login</button>
    </>
  );
};

export default Auth;
