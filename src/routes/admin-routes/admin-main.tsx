import React, { useState } from "react";
import Spacer from "../../components/Spacer";
import { adminRoutes } from "../../data/routes";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import Flex from "../../components/Flex";
import { IoChevronDown, IoChevronUp, IoMenu } from "react-icons/io5";

interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  return (
    <>
      <nav className="desktop:hidden">
        <AdminMobile />
      </nav>
      <nav className="hidden desktop:block">
        <AdminDesktop />
      </nav>
    </>
  );
};

const AdminMobile: React.FC<AdminProps> = () => {
  return (
    <>
      <AdminMobileNavbar />
      <Spacer size="md" />
      <Outlet />
    </>
  );
};

const AdminMobileNavbar: React.FC<AdminProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const adminOptions = adminRoutes.map((route) => {
    return (
      <li key={route[0]}>
        <NavLink
          to={route[0]}
          className={({ isActive }) =>
            clsx(
              "text-white flex align-middle p-4 whitespace-nowrap",
              isActive ? "underline" : "hover:underline"
            )
          }
          onClick={toggleDrawer}
        >
          {route[1]}
        </NavLink>
      </li>
    );
  });
  return (
    <header className="sticky z-20">
      <nav className="fixed w-full">
        <Spacer />
        <div className="drawer w-full bg-secondary place-content-center">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isOpen}
            onChange={toggleDrawer}
          />
          {/* Page content here */}
          {isOpen ? (
            <label
              htmlFor="my-drawer"
              className="flex justify-center w-40 my-1"
            >
              <IoChevronUp className="relative text-white" size={30} />
            </label>
          ) : (
            <label
              htmlFor="my-drawer"
              className="flex justify-center w-40 my-1"
            >
              <IoChevronDown className="relative text-white" size={30} />
            </label>
          )}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-secondary text-white min-h-full w-80 pl-8 p-4">
              <Spacer />
              {adminOptions}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const AdminDesktop: React.FC<AdminProps> = () => {
  const location = useLocation();
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
        <div className="flex w-full">
          <Outlet />
          {location.pathname === "/betaAndPsi" && (
            <div className="flex flex-col gap-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Shift Lookup</h2>
                  <div className="">
                    Shift lookup will allow you to search for those who have
                    signed up for shifts and to email them all as a group
                  </div>
                  <div className="card-actions justify-center">
                    <NavLink to="/betaAndPsi/shiftLookup" className="btn">
                      Shift Lookup
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Form Links</h2>
                  <div className="">
                    Form links will allow you to edit the links for the forms
                    that are sent out to the public.
                  </div>
                  <div className="card-actions justify-center">
                    <NavLink to="/betaAndPsi/formLinks" className="btn">
                      Form Links
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Flex>
    </>
  );
};

export default Admin;
