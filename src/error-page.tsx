import { NavLink, useRouteError } from "react-router-dom";
import Spacer from "./components/Spacer";

export default function ErrorPage() {
  const error: any = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <>
      <Spacer />
      <div id="error-page" className="card mx-auto max-w-2xl">
        <div className="card-body">
          <h1 className="card-title">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
          <div className="">
            To head back to the home page please click here:
          </div>
          <NavLink to={"/"} className="btn">
            Home
          </NavLink>
        </div>
      </div>
    </>
  );
}
