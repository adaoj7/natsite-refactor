import { NavLink, useLocation } from "react-router-dom";
import { Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/react";
import useScrollPosition from "../hooks/useScrollPosition";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { IoMenu } from "react-icons/io5";
import MobileLogo from "../assets/logos/CFN-White-Shadow-01.svg";

type NavbarProps = {
  routes: Array<string> | Array<Array<string>>;
};

type AllRoutesProps = {
  routes: Array<string> | Array<Array<string>>;
  userId: number | null;
  handleLogin: () => void;
};

type MenuItem = Array<string>;

export default function Navbar({ routes }: NavbarProps) {
  const { loginWithRedirect } = useAuth0();
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
  const userId = useSelector((state: any) => state.userId);

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
      <header className="sticky z-10 flex flex-row w-full" id="navbar">
        <nav className="md:hidden fixed w-full">
          <AllRoutesMobile
            routes={routes}
            userId={userId}
            handleLogin={handleLogin}
          />
        </nav>
        <nav
          className={clsx(
            scrollStyling(location),
            "md:flex hidden fixed justify-between w-screen font-bold text-white z--10"
          )}
        >
          <div className="flex ml-28 m-2 p-3 gap-2">
            <AllRoutesDesktop
              routes={routes}
              userId={userId}
              handleLogin={handleLogin}
            />
          </div>
        </nav>
      </header>
    </>
  );
}

// first navbar component
const AllRoutesMobile: React.FC<AllRoutesProps> = ({
  routes,
  userId,
  handleLogin,
}) => {
  const allRoutes = routes.map((route) => {
    if (route[0] === "menu") {
      // const menuName = route[1];
      const menu = route[2];
      // @ts-expect-error - menu is an array of arrays
      const menuReturn = menu.map((menuItem: MenuItem, index) => {
        return (
          <li key={index}>
            <NavLink to={menuItem[0]} key={menuItem[0]}>
              {menuItem[1]}
            </NavLink>
          </li>
        );
      });

      return (
        <>
          <li>
            <details open>
              <summary className="text-white">Get Involved</summary>
              <div>
                <ul
                  className={"flex flex-col text-white"}
                  // anchor="bottom start"
                >
                  <div className="border-t border-black"></div>
                  {menuReturn}
                  <div className="border-b border-black"></div>
                </ul>
              </div>
            </details>
          </li>
        </>
      );
    }

    return (
      <li key={route[0]}>
        <NavLink
          to={route[0]}
          className={({ isActive }) => {
            if (isActive) {
              return "text-white";
            }
            return "text-white";
          }}
        >
          {route[1]}
        </NavLink>
      </li>
    );
  });

  return (
    <div className="flex drawer h-24 bg-primary w-full items-center">
      <img src={MobileLogo} className="h-16 ml-6 invert" />

      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <label htmlFor="mobile-drawer" className="flex justify-end w-full m-4">
        <IoMenu className="relative text-white" size={40} />
      </label>
      <div className="drawer-side">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-60 bg-secondary">
          {allRoutes}

          <li className="text-white">
            {userId ? (
              <NavLink to={"/user"}>Profile</NavLink>
            ) : (
              <button onClick={() => handleLogin()}>Login</button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

// second Navbar component
const AllRoutesDesktop: React.FC<AllRoutesProps> = ({
  routes,
  userId,
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
          className={"relative inline-block text-left"}
          key={index}
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
              "bg-secondary flex flex-col absolute right-0 top-12 w-32 origin-top-right border-primary border-2 rounded-xl ring-opacity-50 focus:outline-none"
            }
          >
            {menuReturn}
          </MenuItems>
        </Menu>
      );
    }

    return (
      <div key={route[0]}>
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
      </div>
    );
  });

  return (
    <>
      {allRoutes}
      <div className="h-auto flex items-center mr-20">
        {userId ? (
          <NavLink to={"/user"}>Profile</NavLink>
        ) : (
          <button onClick={() => handleLogin()}>Login</button>
        )}
      </div>
    </>
  );
};
