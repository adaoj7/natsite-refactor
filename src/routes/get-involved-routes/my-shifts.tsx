import { NavLink } from "react-router-dom";
import UserShifts from "../../components/UserShifts";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export default function MyShifts() {
  const userId = useSelector((state: any) => state.userId);
  const churchId = useSelector((state: any) => state.churchId);
  // const churchId = null;
  // const userId = null;

  const { loginWithRedirect } = useAuth0();

  async function handleLogin() {
    try {
      loginWithRedirect({
        appState: { returnTo: location.pathname },
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (!userId) {
    return (
      <div className="mx-auto mt-12">
        To view this page, please{" "}
        <button onClick={handleLogin} className="btn btn-sm">
          login
        </button>{" "}
      </div>
    );
  } else if (!churchId) {
    return (
      <div className="mx-auto mt-12">
        To view this page, please complete your{" "}
        <NavLink to="/user" className="btn btn-sm">
          profile
        </NavLink>{" "}
      </div>
    );
  }

  return (
    <div className="w-full">
      <UserShifts />
    </div>
  );
}
