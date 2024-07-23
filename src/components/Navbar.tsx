// recieves an array of routes and renders a navbar with links to each route
// do I want more granular control over the routes?
// the reason I question is because I have the nested routes, but I probably can nest them in the structure that I pass in

import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem } from "@headlessui/react";

type NavbarProps = {
  routes: Array<string> | Array<Array<string>>;
};
type MenuItem = Array<string>;

export default function Navbar({ routes }: NavbarProps) {
  const allRoutes = routes.map((route) => {
    if (route[0] === "menu") {
      const menu = route[1];
      menu.map((menuItem: MenuItem) => {});
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
