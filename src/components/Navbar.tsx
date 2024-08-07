// recieves an array of routes and renders a navbar with links to each route

import { NavLink } from "react-router-dom";
import { Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/react";

type NavbarProps = {
  routes: Array<string> | Array<Array<string>>;
};
type MenuItem = Array<string>;

export default function Navbar({ routes }: NavbarProps) {
  const allRoutes = routes.map((route) => {
    if (route[0] === "menu") {
      const menuName = route[1];
      const menu = route[2];
      const menuReturn = menu.map((menuItem: MenuItem) => {
        return (
          <MenuItem key={menuItem[0]}>
            <NavLink to={menuItem[0]}>{menuItem[1]}</NavLink>
          </MenuItem>
        );
      });

      return (
        <Menu as="div" key={route[0]}>
          <MenuButton as="a" href={menuName[0]}>
            {menuName[1]}
          </MenuButton>
          <MenuItems className={"flex flex-col"}>{menuReturn}</MenuItems>
        </Menu>
      );
    }
    return (
      <>
        <NavLink to={route[0]} key={route[0]}>
          {route[1]}
        </NavLink>
      </>
    );
  });

  return (
    <div>
      <header className="sticky z-10 flex flex-row w-full h-24 bg-slate-600 items-center">
        <nav className="flex flex-row fixed">{allRoutes}</nav>
      </header>
    </div>
  );
}
