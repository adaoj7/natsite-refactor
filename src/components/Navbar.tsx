// recieves an array of routes and renders a navbar with links to each route
// do I want more granular control over the routes?
// the reason I question is because I have the nested routes, but I probably can nest them in the structure that I pass in

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
          <MenuItems>{menuReturn}</MenuItems>
        </Menu>
      );
    }
    return (
      <li>
        <NavLink to={route[0]} key={route[0]}>
          {route[1]}
        </NavLink>
      </li>
    );
  });

  return (
    <div>
      <header>
        <ul>{allRoutes}</ul>
      </header>
    </div>
  );
}
