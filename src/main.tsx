import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.tsx";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import About from "./routes/about.tsx";
import Setup from "./routes/get-involved-routes/setup.tsx";
import Host from "./routes/get-involved-routes/host.tsx";
import MyShifts from "./routes/get-involved-routes/my-shifts.tsx";
import Donate from "./routes/get-involved-routes/donate.tsx";
import ThisYear from "./routes/this-year.tsx";
import Gallery from "./routes/gallery.tsx";
import LightTheWorld from "./routes/light-the-world.tsx";
import Contact from "./routes/contact.tsx";
import ErrorPage from "./error-page.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/getInvolved",
        children: [
          {
            path: "/getInvolved/setup",
            element: <Setup />,
          },
          {
            path: "/getInvolved/host",
            element: <Host />,
          },
          {
            path: "/getInvolved/myShifts",
            element: <MyShifts />,
          },
          {
            path: "/getInvolved/donate",
            element: <Donate />,
          },
        ],
      },
      { path: "/thisYear", element: <ThisYear /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/lightTheWorld", element: <LightTheWorld /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
