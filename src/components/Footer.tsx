import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <footer className="footer footer-center mt-auto text-lg bg-primary text-white p-10 ">
        <nav className="flex phone:flex-col desktop:flex-row gap-4 [&>*]:whitespace-nowrap">
          <NavLink to={"/about"} className="link link-hover">
            About us
          </NavLink>
          <button
            onClick={() =>
              // @ts-expect-error - window location is a valid method
              (window.location = "mailto:peorianativities@gmail.com")
            }
            className="link link-hover"
          >
            Contact
          </button>
          <NavLink to={"/getInvolved"} className="link link-hover">
            Get Involved
          </NavLink>
          <NavLink to={"/getInvolved/donate"} className="link link-hover">
            Donate{" "}
          </NavLink>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaInstagram size={30} />
            </a>
            <a>
              <FaFacebook size={30} />
            </a>
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
