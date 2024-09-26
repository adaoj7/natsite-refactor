import { NavLink, useLocation } from "react-router-dom";
import { Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/react";
import useScrollPosition from "../hooks/useScrollPosition";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { IoMenu } from "react-icons/io5";
import MobileLogo from "../assets/logos/CFN-White-Shadow-01.svg";
import { useState } from "react";

type NavbarProps = {
  routes: any;
};

type AllRoutesProps = {
  routes: Array<string> | Array<Array<string>>;
  user: any | undefined;
  handleLogin: () => void;
};

type MenuItem = Array<string>;

export default function Navbar({ routes }: NavbarProps) {
  const { loginWithRedirect, user } = useAuth0();
  function handleLogin() {
    try {
      loginWithRedirect();
    } catch (error) {
      console.error(error);
    }
  }

  const location = useLocation();
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 0;
  const dispatch = useDispatch();

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      if (response.data) {
        dispatch({ type: "LOGIN", payload: response.data });
      }
      // needs a return for the cache to work
      return await response.data;
    },
    retry: true,
  });

  function scrollStyling(location: any) {
    if (location.pathname === "/") {
      if (isScrolled) {
        return "justify-between bg-primary";
      }
      return "bg-transparent";
    }
    return "justify-between bg-primary";
  }

  return (
    <>
      <header className="sticky z-30 flex flex-row w-full" id="navbar">
        <nav className="desktop:hidden fixed w-full">
          <AllRoutesMobile
            routes={routes}
            user={user}
            handleLogin={handleLogin}
          />
        </nav>
        <nav
          className={clsx(
            scrollStyling(location),
            "desktop:flex hidden fixed justify-between w-full font-bold text-white z--30"
          )}
        >
          <AllRoutesDesktop
            routes={routes}
            user={user}
            handleLogin={handleLogin}
          />
        </nav>
      </header>
    </>
  );
}

const AllRoutesMobile: React.FC<AllRoutesProps> = ({
  routes,
  user,
  handleLogin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const allRoutes = routes.map((route) => {
    if (route[0] === "menu") {
      // const menuName = route[1];
      const menu = route[2];
      // @ts-expect-error - menu is an array of arrays
      const menuReturn = menu.map((menuItem: MenuItem, index) => {
        return (
          <li key={index}>
            <NavLink to={menuItem[0]} key={menuItem[0]} onClick={toggleDrawer}>
              {menuItem[1]}
            </NavLink>
          </li>
        );
      });

      return (
        <div key={menu[0]}>
          <li>
            <details open>
              <summary>Get Involved</summary>
              <ul className="flex flex-col text-white ml-6 border-l border-gray-200">
                {menuReturn}
              </ul>
            </details>
          </li>
        </div>
      );
    }

    return (
      <li key={route[0]}>
        <NavLink to={route[0]} onClick={toggleDrawer}>
          {route[1]}
        </NavLink>
      </li>
    );
  });

  return (
    <div className="flex drawer h-24 bg-primary w-full items-center">
      <img src={MobileLogo} className="h-16 ml-6 invert" />

      <input
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={toggleDrawer}
      />
      <label htmlFor="mobile-drawer" className="flex justify-end w-full m-4">
        <IoMenu className="relative text-white" size={40} />
      </label>
      <div className="drawer-side">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-60 bg-secondary">
          <div className="mt-4 text-white">
            {allRoutes}
            <li className="">
              {user ? (
                <NavLink to={"/user"}>Profile</NavLink>
              ) : (
                <button onClick={() => handleLogin()}>Login</button>
              )}
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

const AllRoutesDesktop: React.FC<AllRoutesProps> = ({
  routes,
  user,
  handleLogin,
}) => {
  const allRoutes = routes.map((route, index) => {
    if (route[0] === "menu") {
      const menuName = route[1];
      const menu = route[2];
      // @ts-expect-error - menu is an array of arrays
      const menuReturn = menu.map((menuItem: MenuItem, index) => {
        return (
          <MenuItem key={index}>
            <NavLink to={menuItem[0]} key={menuItem[0]}>
              {menuItem[1]}
            </NavLink>
          </MenuItem>
        );
      });

      if (location.pathname === "/") {
        return (
          <NavLink
            key={menuName[0]}
            to={menuName[0]}
            className={({ isActive }) =>
              clsx(
                "flex align-middle p-4 whitespace-nowrap",
                isActive ? "underline" : "hover:underline"
              )
            }
          >
            {menuName[1]}
          </NavLink>
        );
      }

      return (
        <Menu as="div" className="relative" key={index}>
          <MenuButton
            as="div"
            className="flex p-4 hover:underline whitespace-nowrap hover:cursor-pointer select-none"
          >
            {menuName[1]}
          </MenuButton>
          <MenuItems className="flex flex-col absolute top-12 p-4 origin-top-right bg-secondary border-primary border-2 rounded-xl">
            {menuReturn}
          </MenuItems>
        </Menu>
      );
    }

    return (
      <div key={route[0]}>
        <NavLink
          to={route[0]}
          className={({ isActive }) =>
            clsx(
              "flex align-middle p-4 whitespace-nowrap",
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
      <div className="flex ml-28 m-2 p-3 gap-2 w-full">{allRoutes}</div>
      <div className="h-auto flex items-center mr-20">
        {user ? (
          <NavLink to={"/user"}>Profile</NavLink>
        ) : (
          <button onClick={() => handleLogin()}>Login</button>
        )}
      </div>
    </>
  );
};
