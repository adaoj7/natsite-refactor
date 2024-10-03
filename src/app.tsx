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
import Admin from "./routes/admin-routes/admin-main";
import ShiftLookup from "./routes/admin-routes/shift-lookup";
import axios from "axios";
import User from "./routes/user";
import FormLinks from "./routes/admin-routes/form-links";
import ShiftAvailabilities from "./routes/admin-routes/shift-availabilities";
import DateAndTimeGraph from "./components/DateAndTimes";
import { useQuery } from "@tanstack/react-query";
import { LTW2023 } from "./routes/light-the-world-routes/LTW2023";

function App() {
  // const isAdmin = false;
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return await response.data;
    },
  });
  const isAdmin = data?.isAdmin;

  const router2 = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/getInvolved" element={<GetInvolved />}>
          <Route
            path="/getInvolved/availabilities"
            element={<DateAndTimeGraph />}
          />
          <Route path="/getInvolved/setup" element={<Setup />} />
          <Route path="/getInvolved/host" element={<Host />} />
          <Route path="/getInvolved/myShifts" element={<MyShifts />} />
          <Route path="/getInvolved/donate" element={<Donate />} />
        </Route>
        <Route path="/thisYear" element={<ThisYear />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/lightTheWorld" element={<LightTheWorld />}>
          <Route path="/lightTheWorld/2023" element={<LTW2023 />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/user" element={data ? <User /> : <Home />} />
        <Route path="/betaAndPsi" element={isAdmin ? <Admin /> : <Home />}>
          <Route
            path="/betaAndPsi/shiftAvailabilities"
            element={isAdmin ? <ShiftAvailabilities /> : <Home />}
          />
          <Route
            path="/betaAndPsi/shiftLookup"
            element={isAdmin ? <ShiftLookup /> : <Home />}
          />
          <Route
            path="/betaAndPsi/formLinks"
            element={isAdmin ? <FormLinks /> : <Home />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router2} />
    </>
  );
}

export default App;
