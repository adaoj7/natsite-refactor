import HeroImage from "../components/Hero";
import { NavLink } from "react-router-dom";
import Gallery from "../components/Gallery";
import { testimonials } from "../data/testimonials";
import Schedule from "../components/Schedule";
import { schedule } from "../data/schedule";

export default function Home() {
  return (
    <>
      <HeroImage />
      <div className="phone:flex desktop:hidden">
        <MobileHome />
      </div>
      <div className="hidden desktop:flex">
        <DesktopHome />
      </div>
    </>
  );
}

function MobileHome() {
  return (
    <>
      <div className="flex w-full flex-col p-4 text-xl">
        <section>
          <Schedule schedule={schedule} />
        </section>
        <section className="flex flex-col justify-between gap-4">
          <div className="card rounded-3xl bg-secondary shadow-sm">
            <div className="card-body flex justify-around">
              <h2 className="card-title justify-center font-Dancing text-5xl">
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
              <h2 className="ml-6 flex items-start text-lg font-semibold">
                Address:
              </h2>
              <div className="card-actions flex flex-col items-center justify-center">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/place/The+Community+Festival+of+Nativities/@40.7352662,-89.6539589,15.5z/data=!4m6!3m5!1s0x880a5c39a382250d:0x6fcfa24cada00e1b!8m2!3d40.732102!4d-89.651485!16s%2Fg%2F11f63xgxt0?entry=ttu`
                    )
                  }
                  className="btn flex justify-center whitespace-nowrap font-bold shadow-sm"
                  title="Address in Google Maps"
                >
                  3700 West Reservoir Boulevard
                </button>
              </div>
            </div>
          </div>

          <div className="card rounded-3xl bg-secondary shadow-sm">
            <div className="card-body">
              <h1 className="card-title justify-center text-2xl">About</h1>
              <div>
                The Peoria Area Community Festival of Nativities was started in
                2016 by members of the Church of Jesus Christ of Latter-day
                Saints, the Sisters of St. Francis of the Immaculate Conception,
                friends from St. Vincent de Paul Catholic Church, and All Saints
                Greek Orthodox Church. Since then the festival has continued to
                grow and invite individuals and families to "Come and See."
              </div>
              <div className="card-actions flex flex-row">
                <span className="hover:no-underline">-</span>
                <NavLink
                  to="/about"
                  className="card-actions items-end underline"
                >
                  About Us
                </NavLink>
              </div>
            </div>
          </div>

          <div className="card rounded-3xl bg-secondary shadow-sm">
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
                <NavLink to="/getInvolved/FTN" className="hover:underline">
                  Friend of the Nativity{" "}
                </NavLink>
              </span>
            </div>
          </div>
        </section>

        <section className="mt-4 flex flex-col justify-between gap-4">
          <div className="card rounded-3xl bg-secondary">
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
                <a href="https://brooklynswenson.com/" className="underline">
                  brooklynswenson.com
                </a>
                <span>to see her art gallery.</span>
              </div>
            </div>
          </div>

          <div className="card basis-1/3 rounded-3xl bg-secondary shadow-sm">
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
              <span className="mt-4 flex justify-center">
                <NavLink to={"/getInvolved/setup"} className="btn font-bold">
                  Setup Shifts
                </NavLink>{" "}
                <span className="m-3">and</span>{" "}
                <NavLink to={"/getInvolved/host"} className="btn font-bold">
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
      <div className="mt-4 flex flex-wrap gap-8 text-xl">
        <section id="schedule" className="mx-8 w-full">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title justify-center text-2xl">
                Performance Schedule
              </h1>
              <Schedule schedule={schedule} />
            </div>
          </div>
        </section>

        <section className="mx-8 flex justify-between gap-8">
          <div className="card basis-1/2 rounded-3xl bg-secondary shadow-sm">
            <div className="card-body">
              <h1 className="card-title justify-center">About</h1>
              <div className="mt-8">
                The Peoria Area Community Festival of Nativities was started in
                2016 by members of the Church of Jesus Christ of Latter-day
                Saints, the Sisters of St. Francis of the Immaculate Conception,
                friends from St. Vincent de Paul Catholic Church, and All Saints
                Greek Orthodox Church. Since then the festival has continued to
                grow and invite individuals and families to "Come and See."
              </div>
              <div className="card-actions flex flex-row">
                <span className="hover:no-underline">-</span>
                <NavLink
                  to="/about"
                  className="card-actions items-end underline"
                >
                  About Us
                </NavLink>
              </div>
            </div>
          </div>

          <div className="card basis-1/4 rounded-3xl bg-secondary shadow-sm">
            <div className="card-body flex justify-between">
              <div>
                <h2 className="card-title mb-4 justify-center font-Dancing text-5xl">
                  All is Bright
                </h2>
                <h2 className="card-title justify-center">
                  December 5-8, 2024
                </h2>
              </div>
              <ul className="m-4 text-center [&>*]:whitespace-nowrap">
                <li className="flex flex-col">
                  <span>Thursday 3pm-9pm</span>
                  <span>Live Nativity 4:00pm-7:00pm</span>
                </li>
                <li className="my-8">Friday & Saturday 10am-9pm</li>
                <li className="">Sunday 12pm-6pm</li>
              </ul>
              <div className="mb-8">
                <h2 className="mb-4 ml-4 flex items-start text-lg font-semibold">
                  Address:
                </h2>
                <div className="card-actions flex flex-col items-center justify-center">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/place/The+Community+Festival+of+Nativities/@40.7352662,-89.6539589,15.5z/data=!4m6!3m5!1s0x880a5c39a382250d:0x6fcfa24cada00e1b!8m2!3d40.732102!4d-89.651485!16s%2Fg%2F11f63xgxt0?entry=ttu`
                      )
                    }
                    className="btn flex justify-center whitespace-nowrap font-bold shadow-sm"
                    title="Address in Google Maps"
                  >
                    3700 West Reservoir Boulevard
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card basis-1/2 rounded-3xl bg-secondary shadow-sm">
            <div className="card-body items-center">
              <div className="card-title">2024 Sponsors</div>
              <ul className="ml-4 flex flex-col [&>*]:my-2">
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
                <NavLink to="/getInvolved/FTN" className="underline">
                  Friend of the Nativity{" "}
                </NavLink>
              </span>
            </div>
          </div>
        </section>

        <section className="mx-8 flex justify-between gap-8">
          <div className="card basis-2/3 rounded-3xl bg-secondary">
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

          <div className="card basis-1/3 rounded-3xl bg-secondary shadow-sm">
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
              <span className="mt-4 flex justify-center">
                <NavLink
                  to={"/getInvolved/setup"}
                  className="btn w-24 font-bold"
                >
                  Setup
                </NavLink>{" "}
                <span className="m-3">and</span>{" "}
                <NavLink
                  to={"/getInvolved/host"}
                  className="btn w-24 font-bold"
                >
                  Hosting
                </NavLink>
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto mb-16 w-[calc(100vw-2rem)]">
          <Gallery type="testimonials" testimonials={testimonials} />
        </section>
      </div>
    </>
  );
}
