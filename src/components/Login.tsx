import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <button onClick={() => loginWithRedirect()}>Login</button>
    </>
  );
};

export default Login;
