import React from "react";
import Spacer from "../../components/Spacer";
import { adminRoutes } from "../../data/routes";
import { NavLink, Outlet } from "react-router-dom";
import clsx from "clsx";
import Flex from "../../components/Flex";

interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  const adminOptions = adminRoutes.map((route) => {
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
          {adminOptions}
        </div>
        <div className="flex justify-center w-full">
          <Outlet />
          {location.pathname === "/betaAndPsi" && (
            <>
              <div>
                Shift lookup will allow you to search for those who have signed
                up for shifts and to email them all as a group
              </div>
            </>
          )}
        </div>
      </Flex>
    </>
  );
};

export default Admin;
