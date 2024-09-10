import HeroImage from "../components/Hero";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, user } = useAuth0();
  async function handleLogin() {
    try {
      await axios.post("/api/login", user);
    } catch (error) {
      console.error(error);
    }
  }
  if (isAuthenticated) {
    handleLogin();
  }

  return (
    <>
      <HeroImage />
      <div className="desktop:hidden phone:flex">
        <MobileHome />
      </div>
      {/* Maybe change the breakpoint */}
      <div className="hidden desktop:flex">
        <DesktopHome />
      </div>
    </>
  );
}

function MobileHome() {
  return (
    <>
      <div className="flex flex-col text-xl w-full p-4">
        <section className="flex flex-col justify-between gap-4">
          <div className="card bg-secondary rounded-3xl shadow-sm">
            <div className="flex card-body justify-around ">
              {/* <!-- Interactive event scheduler/calendar --> */}
              <h2 className="card-title justify-center text-2xl">
                All is Bright
              </h2>
              <h2 className="flex justify-center font-semibold">
                December 5-8, 2024
              </h2>
              <ul className="">
                <li className="flex flex-col">
                  <span>Thursday 3pm-9pm</span>
                  <span>Live Nativity 4:00pm-7:00pm</span>
                </li>
                <li className="">Friday & Saturday 10am-9pm</li>
                <li className="">Sunday 12pm-6pm</li>
              </ul>
              <h2 className="flex items-start font-semibold text-lg ml-6">
                Address:
              </h2>
              <div className="flex flex-col justify-center card-actions items-center">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/place/The+Community+Festival+of+Nativities/@40.7352662,-89.6539589,15.5z/data=!4m6!3m5!1s0x880a5c39a382250d:0x6fcfa24cada00e1b!8m2!3d40.732102!4d-89.651485!16s%2Fg%2F11f63xgxt0?entry=ttu`
                    )
                  }
                  className="flex justify-center text-black font-bold btn whitespace-nowrap shadow-sm"
                  title="Address in Google Maps"
                >
                  3700 West Reservoir Boulevard
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-secondary rounded-3xl shadow-sm">
            <div className="card-body">
              <h1 className="card-title justify-center text-2xl">About</h1>
              {/* <!-- Brief about the festival with a 'Read more' link to the about page --> */}
              <div className="">
                The Peoria Area Community Festival of Nativities was started in
                2016 by members of the Church of Jesus Christ of Latter-day
                Saints and the Sisters of St. Francis of Immaculate Conception.
                Since then the festival has continued to grow and invite
                individuals and families to "Come and See."
              </div>
              <div className="card-actions flex flex-row">
                <span className="hover:no-underline">-</span>
                <NavLink
                  to="/about"
                  className="card-actions items-end hover:underline "
                >
                  About Us
                </NavLink>
              </div>
            </div>
          </div>

          <div className="card bg-secondary rounded-3xl shadow-sm">
            <div className="card-body">
              <div className="card-title justify-center">2024 Sponsors</div>
              <ul className="flex flex-col [&>*]:my-2">
                <li>St. Vincent de Paul Catholic Church</li>
                <li>All Saints Greek Orthodox Church</li>
                <li>Holy Family Catholic Church</li>
                <li>Peoria Heights Christian Church</li>
                <li>Mt Hawley Community Church</li>
                <li>The Church of Jesus Christ of Latter-day Saints</li>
              </ul>
              <span>
                For more information on how to become a{" "}
                <NavLink to="/donate" className="hover:underline">
                  Friend of the Nativity{" "}
                </NavLink>
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-between mt-4 gap-4">
          <div className="card bg-secondary rounded-3xl">
            <div className="card-body gap-4">
              <div>
                We are grateful to Brooklyn Swenson for the use of her artwork
                in our promotional materials this year.
              </div>
              <div>
                Brooklyn Swenson is a young artist from Utah. She has a great
                love for everything folk and it is a common theme throughout her
                artwork. She attended art school after high school and
                eventually everything came full circle for her after taking a
                watercolor class at BYU. She works with watercolor, acryla
                gouache, gouache, and digital mediums.
              </div>
              <div className="flex flex-wrap justify-center">
                <span>Please visit her website</span>
                <a href="https://brooklynswenson.com/" className=" underline">
                  brooklynswenson.com
                </a>
                <span>to see her art gallery.</span>
              </div>
            </div>
          </div>

          <div className="card bg-secondary rounded-3xl shadow-sm basis-1/3">
            <div className="card-body">
              <h1 className="flex justify-center font-semibold">
                Get Involved
              </h1>

              <div className="flex flex-wrap gap-1">
                <span>
                  We are always looking for those who are interested in getting
                  involved.
                </span>
                <span>We offer two main types of volunteering:</span>
              </div>
              <span className="flex justify-center mt-4">
                <NavLink to={"/volunteer/setup"} className="btn font-bold ">
                  Setup Shifts
                </NavLink>{" "}
                <span className="m-3">and</span>{" "}
                <NavLink to={"/volunteer/host"} className="btn font-bold ">
                  Host Shifts
                </NavLink>
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function DesktopHome() {
  return (
    <>
      <div className="flex flex-wrap gap-16 mt-16 text-xl">
        <section className="flex justify-between gap-8 mx-8">
          <div className="card bg-secondary rounded-3xl shadow-sm basis-1/2">
            <div className="card-body">
              <h1 className="card-title justify-center">About</h1>
              {/* <!-- Brief about the festival with a 'Read more' link to the about page --> */}
              <div className="mt-8">
                The Peoria Area Community Festival of Nativities was started in
                2016 by members of the Church of Jesus Christ of Latter-day
                Saints and the Sisters of St. Francis of Immaculate Conception.
                Since then the festival has continued to grow and invite
                individuals and families to "Come and See."
              </div>
              <div className="card-actions flex flex-row">
                <span className="hover:no-underline">-</span>
                <NavLink
                  to="/about"
                  className="card-actions items-end hover:underline "
                >
                  About Us
                </NavLink>
              </div>
            </div>
          </div>

          <div className="card bg-secondary rounded-3xl shadow-sm basis-1/4">
            <div className="flex card-body justify-around ">
              {/* <!-- Interactive event scheduler/calendar --> */}
              <h2 className="flex justify-center font-semibold">
                All is Bright
              </h2>
              <h2 className="flex justify-center font-semibold">
                December 5-8, 2024
              </h2>
              <ul className="m-4 [&>*]:whitespace-nowrap gap-4">
                <li className="flex flex-col">
                  <span>Thursday 3pm-9pm</span>
                  <span>- Live Nativity 4:00pm-7:00pm</span>
                </li>
                <li className="my-4">Friday & Saturday 10am-9pm</li>
                <li className="">Sunday 12pm-6pm</li>
              </ul>
              <h2 className="flex items-start font-semibold text-lg ml-6">
                Address:
              </h2>
              <div className="flex flex-col justify-center card-actions items-center">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/place/The+Community+Festival+of+Nativities/@40.7352662,-89.6539589,15.5z/data=!4m6!3m5!1s0x880a5c39a382250d:0x6fcfa24cada00e1b!8m2!3d40.732102!4d-89.651485!16s%2Fg%2F11f63xgxt0?entry=ttu`
                    )
                  }
                  className="flex justify-center text-black font-bold btn whitespace-nowrap shadow-sm"
                  title="Address in Google Maps"
                >
                  3700 West Reservoir Boulevard
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-secondary rounded-3xl shadow-sm basis-1/2">
            <div className="card-body items-center">
              <div className="card-title">2024 Sponsors</div>
              <ul className="flex flex-col ml-4 [&>*]:my-2">
                <li>St. Vincent de Paul Catholic Church</li>
                <li>All Saints Greek Orthodox Church</li>
                <li>Holy Family Catholic Church</li>
                <li>Peoria Heights Christian Church</li>
                <li>Mt Hawley Community Church</li>
                <li className="">
                  The Church of Jesus Christ of Latter-day Saints
                </li>
              </ul>
              <span>
                For more information on how to become a{" "}
                <NavLink to="/donate" className="underline">
                  Friend of the Nativity{" "}
                </NavLink>
              </span>
            </div>
          </div>
        </section>

        <section className="flex justify-between gap-8 mx-8 mb-16">
          <div className="card bg-secondary rounded-3xl basis-2/3">
            <div className="card-body">
              <div>
                We are grateful to Brooklyn Swenson for the use of her artwork
                in our promotional materials this year.
              </div>
              <div>
                Brooklyn Swenson is a young artist from Utah. She has a great
                love for everything folk and it is a common theme throughout her
                artwork. She attended art school after high school and
                eventually everything came full circle for her after taking a
                watercolor class at BYU. She works with watercolor, acryla
                gouache, gouache, and digital mediums.
              </div>
              <div>
                <span>Please visit her website</span>
                <a
                  href="https://brooklynswenson.com/"
                  className="mx-1 underline"
                >
                  brooklynswenson.com
                </a>
                <span>to see her art gallery.</span>
              </div>
            </div>
          </div>

          <div className="card bg-secondary rounded-3xl shadow-sm basis-1/3">
            <div className="card-body">
              <h1 className="flex justify-center font-semibold">
                Get Involved
              </h1>

              <div className="flex flex-wrap gap-1">
                <span>
                  We are always looking for those who are interested in getting
                  involved.
                </span>
                <span>We offer two main types of volunteering:</span>
              </div>
              <span className="flex justify-center mt-4">
                <NavLink to={"/volunteer/setup"} className="btn font-bold w-24">
                  Setup
                </NavLink>{" "}
                <span className="m-3">and</span>{" "}
                <NavLink to={"/volunteer/host"} className="btn font-bold w-24">
                  Hosting
                </NavLink>
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
