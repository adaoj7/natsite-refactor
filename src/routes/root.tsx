import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div id="navbar">
      <div className="flex flex-row">
        <Link to={"/"}>This is also a link</Link>
        <Link to={"/firstRoute"}>This is a link</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
