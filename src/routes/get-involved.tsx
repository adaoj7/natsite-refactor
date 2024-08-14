// import React from "react";
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
  // @ts-expect-error - getInvolved is an array of one element
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
      <Flex className="h-[calc(100%-6rem)]">
        <div className="flex flex-col gap-4 border-r-2 border-gray-400 h-full px-4">
          {getInvolvedRoutes}
        </div>
        <Outlet />
      </Flex>
    </>
  );
}
