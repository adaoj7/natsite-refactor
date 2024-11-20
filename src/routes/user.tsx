import Profile from "../components/Profile";
import { userRoutes } from "../data/routes";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Flex from "../components/Flex";
import clsx from "clsx";
import Spacer from "../components/Spacer";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function User() {
  const location = useLocation();
  const { user } = useAuth0();

  const userOptions = userRoutes.map((route) => {
    return (
      <div key={route[0]}>
        <NavLink
          to={route[0]}
          className={({ isActive }) =>
            clsx(
              "flex whitespace-nowrap p-4 align-middle text-black",
              isActive ? "underline" : "hover:underline"
            )
          }
        >
          {route[1]}
        </NavLink>
      </div>
    );
  });

  return (
    <>
      <Spacer />
      <Flex className="min-h-[calc(100vh-342px)]">
        <nav className="hidden flex-col gap-4 border-r-2 border-primary px-4 desktop:flex">
          {userOptions}
        </nav>
        <div className="mx-auto block w-full">
          <Outlet />
          {location.pathname.toLowerCase() === "/user" && (
            <>
              <Profile />
              <div className="card-body w-full pt-0">
                <button
                  onClick={() => {
                    const dialog = document.getElementById(
                      "change-password-dialog"
                    ) as HTMLDialogElement;
                    dialog?.showModal();
                  }}
                  className="btn mx-auto w-40"
                >
                  Change Password
                </button>
              </div>
              <dialog id="change-password-dialog" className="modal">
                <div className="modal-box">
                  <button
                    onClick={async () => {
                      await axios.post("/api/changePassword", {
                        email: user?.email,
                      });
                    }}
                    className="btn flex justify-center"
                  >
                    Change Password
                  </button>
                  <div className="modal-action">
                    <form method="dialog">
                      <button>Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          )}
        </div>
      </Flex>
    </>
  );
}
