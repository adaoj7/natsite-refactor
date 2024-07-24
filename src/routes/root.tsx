import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const routes = [
  ["/", "Home Page"],
  ["/about", "About"],
  [
    "menu",
    ["/getInvolved", "Get Involved"],
    [
      ["/setup", "Setup"],
      ["/host", "Host"],
      ["/myShifts", "My Shifts"],
      ["/donate", "Donate"],
    ],
  ],
  ["/thisYear", "This Year"],
  ["/gallery", "Fifth Route"],
  ["/lightTheWorld", "Light the World"],
  ["/contact", "Contact"],
];

export default function Root() {
  return (
    <div id="navbar">
      <Navbar routes={routes} />
      <Outlet />
    </div>
  );
}
