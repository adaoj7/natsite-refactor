import { NavLink } from "react-router-dom";
import Shifts from "../../components/Shifts";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export default function Host() {
  const userId = useSelector((state: any) => state.userId);
  const churchId = useSelector((state: any) => state.churchId);

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
    <div className="mx-auto phone:my-4">
      <div className="card-body items-center text-xl">
        <h2 className="card-title text-2xl">Host</h2>
        <div className="mb-4 max-w-[700px]">
          We are looking for volunteers to help with hosting and tours during
          the festival. Feel free to sign up for as many shifts as you would
          like. When showing up to host, please arrive 15 minutes early to sign
          in. We also ask that you wear business casual attire.
        </div>
        <Shifts shiftType="host" />
      </div>
    </div>
  );
}
