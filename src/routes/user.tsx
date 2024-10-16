import React from "react";
import Profile from "../components/Profile";
import { userRoutes } from "../data/routes";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Flex from "../components/Flex";
import clsx from "clsx";
import Spacer from "../components/Spacer";

interface userProps {}

export default function User() {
  const location = useLocation();
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
        <div className="m-auto flex w-full">
          <Outlet />
          {location.pathname === "/user" && <Profile />}
        </div>
      </Flex>
    </>
  );
}
