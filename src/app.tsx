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
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  async function handleLogin() {
    try {
      const data = await axios
        .post("/api/login", user)
        .then((res) => dispatch({ type: "LOGIN", payload: res.data }));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (isAuthenticated) {
    handleLogin();
  }

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
        <Route path="/betaAndPsi" element={<Admin />}>
          <Route path="/betaAndPsi/shiftLookup" element={<ShiftLookup />} />
          <Route path="/betaAndPsi/futureShifts" element={<Admin />} />
          <Route path="/betaAndPsi/nomination" element={<Admin />} />
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
