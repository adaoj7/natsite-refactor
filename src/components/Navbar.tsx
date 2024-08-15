// recieves an array of routes and renders a navbar with links to each route

import { NavLink, useLocation } from "react-router-dom";
import { Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/react";
import useScrollPosition from "../hooks/useScrollPosition";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Logout from "./Logout";
import Auth from "./Auth";

type NavbarProps = {
  routes: Array<string> | Array<Array<string>>;
};
type MenuItem = Array<string>;

export default function Navbar({ routes }: NavbarProps) {
  const location = useLocation();
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 0;

  function scrollStyling(location: any) {
    if (location.pathname === "/") {
      if (isScrolled) {
        return "justify-between bg-green-900";
      }
      return "bg-transparent";
    }
    return "justify-between bg-green-900";
  }

  const allRoutes = routes.map((route) => {
    if (route[0] === "menu") {
      const menuName = route[1];
      const menu = route[2];
      // @ts-expect-error - menu is an array of arrays
      const menuReturn = menu.map((menuItem: MenuItem) => {
        return (
          <MenuItem key={menuItem[0]}>
            <NavLink to={menuItem[0]}>{menuItem[1]}</NavLink>
          </MenuItem>
        );
      });

      if (location.pathname === "/") {
        return (
          <NavLink
            to={menuName[0]}
            className={({ isActive }) =>
              isActive
                ? "flex align-middle p-4 rounded-3xl whitespace-nowrap"
                : "text-white flex align-middle p-4 hover:underline whitespace-nowrap"
            }
          >
            {menuName[1]}
          </NavLink>
        );
      }
      return (
        <Menu
          as="div"
          key={route[0]}
          className={"relative inline-block text-left"}
        >
          <MenuButton
            as="a"
            className={
              "text-white flex align-middle p-4 hover:underline whitespace-nowrap "
            }
            href={menuName[0]}
          >
            {menuName[1]}
          </MenuButton>
          <MenuItems
            className={
              "absolute right-0 mt-8 w-32 origin-top-right rounded-xl ring-opacity-50 focus:outline-none"
            }
          >
            {menuReturn}
          </MenuItems>
        </Menu>
      );
    }

    return (
      <>
        <NavLink
          to={route[0]}
          className={({ isActive }) => {
            if (isActive) {
              return "flex align-middle p-4 rounded-3xl whitespace-nowrap underline";
            }
            return "text-white flex align-middle p-4 hover:underline whitespace-nowrap";
          }}
        >
          {route[1]}
        </NavLink>
      </>
    );
  });

  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    <div>
      <header className="sticky z-10 flex flex-row w-full" id="navbar">
        <nav
          className={clsx(
            scrollStyling(location),
            "fixed flex justify-between w-screen font-bold text-white z--10 "
          )}
        >
          <div className="flex ml-28 m-2 p-3 gap-2">{allRoutes}</div>
          <div className="h-auto flex items-center mr-20">
            <Auth isAuthenticated={isAuthenticated} />
          </div>
        </nav>
      </header>
    </div>
  );
}
