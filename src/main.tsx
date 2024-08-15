import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.tsx";
import Root from "./root.tsx";
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
import GetInvolved from "./routes/get-involved.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
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
        element: <GetInvolved />,
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
    <Auth0Provider
      domain="dev-ppwy2ztmkc8qhczn.us.auth0.com"
      clientId="2E49IGFsP0ZYrxrlTWZNB3RU3maxsCTW"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>
);
