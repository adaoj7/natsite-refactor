// import React from "react";
import Spacer from "../components/Spacer";
import { routes } from "../data/routes";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Flex from "../components/Flex";
import clsx from "clsx";

export default function GetInvolved() {
  const getInvolved = routes.filter((route) => {
    if (route[0] === "menu") {
      return route[2];
    }
  });
  const location = useLocation();
  // @ts-expect-error - getInvolved is an array of one element
  const getInvolvedRoutes = getInvolved[0][2].map((route) => {
    return (
      <div key={route[0]}>
        <NavLink
          to={route[0]}
          className={({ isActive }) =>
            clsx(
              "text-black flex align-middle p-4 whitespace-nowrap",
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
      <Flex className="min-h-[calc(100vh-176px)]">
        <div className="flex flex-col gap-4 border-r-2 border-primary  px-4">
          {getInvolvedRoutes}
        </div>
        <Outlet />
        {location.pathname === "/getInvolved" && (
          <div className="text-black">Get Involved</div>
        )}
      </Flex>
    </>
  );
}
