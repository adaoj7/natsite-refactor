import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

interface AuthProps {
  isAuthenticated: boolean;
}

const Auth: React.FC<AuthProps> = ({ isAuthenticated }) => {
  const { loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    //maybe add a modal here to show account info or only allow logout from settings page
    return (
      <>
        <button onClick={() => logout()}>Logout</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => loginWithRedirect()}>Login</button>
    </>
  );
};

export default Auth;
