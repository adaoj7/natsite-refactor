import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./data/routes";
import Footer from "./components/Footer";

export default function Root() {
  // fix ts error
  return (
    <>
      <Navbar routes={routes} />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
}
