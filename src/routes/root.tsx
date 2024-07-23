import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const routes = [
  ["/", "Home Page"],
  ["/about", "About"],
  [
    "menu",
    [
      ["/setup", "Setup"],
      ["/host", "Host"],
      ["/myShifts", "My Shifts"],
      ["/donate", "Donate"],
    ],
  ],
  ["/fourthRoute", "Fourth Route"],
  ["/fifthRoute", "Fifth Route"],
  ["/sixthRoute", "Sixth Route"],
  ["/seventhRoute", "Seventh Route"],
  ["/eighthRoute", "Eighth Route"],
];

export default function Root() {
  return (
    <div id="navbar">
      <Navbar routes={routes} />
      <Outlet />
    </div>
  );
}
