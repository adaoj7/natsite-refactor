import React from "react";
import Spacer from "../components/Spacer";
import { routes } from "../data/routes";
import { NavLink, Outlet } from "react-router-dom";
import Flex from "../components/Flex";
import clsx from "clsx";

export default function GetInvolved() {
  const getInvolved = routes.filter((route) => {
    if (route[0] === "menu") {
      return route[2];
    }
  });
  const getInvolvedRoutes = getInvolved[0][2].map((route) => {
    return (
      <>
        <NavLink
          to={route[0]}
          className={({ isActive }) =>
            clsx(
              "text-white flex align-middle p-4 whitespace-nowrap",
              isActive ? "underline" : "hover:underline"
            )
          }
        >
          {route[1]}
        </NavLink>
      </>
    );
  });

  return (
    <>
      <Spacer />
      <Flex>
        <div className="flex flex-col">{getInvolvedRoutes}</div>;
        <Outlet />
      </Flex>
    </>
  );
}
