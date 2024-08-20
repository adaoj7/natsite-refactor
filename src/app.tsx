import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./root";
import Home from "./routes/home";
import About from "./routes/about";
import Setup from "./routes/get-involved-routes/setup";
import Host from "./routes/get-involved-routes/host";
import MyShifts from "./routes/get-involved-routes/my-shifts";
import Donate from "./routes/get-involved-routes/donate";
import ThisYear from "./routes/this-year";
import Gallery from "./routes/gallery";
import LightTheWorld from "./routes/light-the-world";
import Contact from "./routes/contact";
import ErrorPage from "./error-page";
import GetInvolved from "./routes/get-involved";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  const router2 = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/getInvolved" element={<GetInvolved />}>
          <Route path="/getInvolved/setup" element={<Setup />} />
          <Route path="/getInvolved/host" element={<Host />} />
          <Route path="/getInvolved/myShifts" element={<MyShifts />} />
          <Route path="/getInvolved/donate" element={<Donate />} />
        </Route>
        <Route path="/thisYear" element={<ThisYear />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/lightTheWorld" element={<LightTheWorld />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    )
  );

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

  return (
    <>
      <RouterProvider router={router2} />
    </>
  );
}

export default App;
