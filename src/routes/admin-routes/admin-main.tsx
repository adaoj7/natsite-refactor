import React, { useState } from "react";
import Spacer from "../../components/Spacer";
import { adminRoutes } from "../../data/routes";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import Flex from "../../components/Flex";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

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
      {location.pathname === "/betaPsi" && (
        <div className="card mx-auto max-w-[700px]">
          <div className="card-body">
            <h2 className="card-title text-2xl">Admin Page</h2>
            <div className="flex flex-col gap-4">
              <div className="">
                Admins will be able to view shift availabilities and the number
                of signups for the different congregations as well as be able to
                search specific dates and times and contact those who have
                signed up.
              </div>
              <div>
                Admins also have the ability to change the links to the
                different forms such as music signups and poinsettia
                sponsorships.
              </div>
            </div>
          </div>
        </div>
      )}
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
              "flex whitespace-nowrap p-4 align-middle text-white",
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
        <div className="drawer w-full place-content-center bg-secondary">
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
              className="my-1 flex w-40 justify-center"
            >
              <IoChevronUp className="relative text-white" size={30} />
            </label>
          ) : (
            <label
              htmlFor="my-drawer"
              className="my-1 flex w-40 justify-center"
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
            <ul className="menu min-h-full w-80 bg-secondary p-4 pl-8 text-lg text-white">
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
      <Flex className="min-h-[calc(100vh-176px)]">
        <div className="flex flex-col gap-4 border-r-2 border-primary px-4">
          {adminOptions}
        </div>
        <div className="mx-auto flex w-full">
          <Outlet />
          {location.pathname === "/betaPsi" && (
            <div className="card mx-auto max-w-[700px]">
              <div className="card-body">
                <h2 className="card-title text-2xl">Admin Page</h2>
                <div className="flex flex-col gap-4">
                  <div className="">
                    Admins will be able to view shift availabilities and the
                    number of signups for the different congregations as well as
                    be able to search specific dates and times and contact those
                    who have signed up.
                  </div>
                  <div>
                    Admins also have the ability to change the links to the
                    different forms such as music signups and poinsettia
                    sponsorships.
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
