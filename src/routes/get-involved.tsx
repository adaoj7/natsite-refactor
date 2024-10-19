﻿import Spacer from "../components/Spacer";
import { routes } from "../data/routes";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Flex from "../components/Flex";
import clsx from "clsx";
import DateAndTimeGraph from "../components/DateAndTimes";

export default function GetInvolved() {
  const location = useLocation();
  const getInvolved = routes.filter((route) => {
    if (route[0] === "menu") {
      return route[2];
    }
  });
  // @ts-expect-error - getInvolved is an array of one element
  const getInvolvedRoutes = getInvolved[0][2].map((route) => {
    return (
      <div key={route[0]}>
        <NavLink
          to={route[0]}
          className={({ isActive }) =>
            clsx(
              "flex overflow-auto whitespace-nowrap p-4 align-middle text-black",
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
          {getInvolvedRoutes}
        </nav>
        <div className="flex w-full">
          <Outlet />
          {location.pathname.toLowerCase() === "/getinvolved" && (
            <DateAndTimeGraph />
          )}
        </div>
      </Flex>
    </>
  );
}
