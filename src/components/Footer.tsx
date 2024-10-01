import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <footer className="footer footer-center mt-auto text-lg bg-primary text-white p-10 ">
        <nav className="flex phone:flex-col desktop:flex-row gap-4 [&>*]:whitespace-nowrap">
          <NavLink to={"/about"} className="link link-hover">
            About us
          </NavLink>
          <NavLink to={"/contact"} className="link link-hover">
            Contact
          </NavLink>
          <NavLink to={"/getInvolved"} className="link link-hover">
            Get Involved
          </NavLink>
          <NavLink to={"/getInvolved/donate"} className="link link-hover">
            Donate{" "}
          </NavLink>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link to="https://www.instagram.com/peoria_nativity">
              <FaInstagram size={30} />
            </Link>
            <Link to="https://www.facebook.com/CommunityFestivalofNativities">
              <FaFacebook size={30} />
            </Link>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by The
            Peoria Area Community Festival of Nativities
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
