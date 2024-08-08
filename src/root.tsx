import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./data/routes";

export default function Root() {
  return (
    <div id="navbar">
      <Navbar routes={routes} />
      <Outlet />
    </div>
  );
}
