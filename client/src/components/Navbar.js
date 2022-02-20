import React, { useContext, useState } from "react";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">AboutMe</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">AboutMe</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/register">Registration</Link>
          </li>
        </>
      );
    }
  };

  return (
    <div className="main-container" method="GET">
      <div className={`${showMobileMenu ? "sidebar active" : "sidebar"}`}>
        <ul className="sidebarUl">
          <RenderMenu />
        </ul>
        <FaIcons.FaTimes
          className="closeBtn"
          onClick={() => setShowMobileMenu(false)}
        />
      </div>
      <div className="navbar-container">
        <Link to="/">
          <h2>
            <span>M</span>y<span>L</span>ogo
          </h2>
        </Link>

        <ul className="navbarUl">
          <RenderMenu />
        </ul>
        <FaIcons.FaBars
          className="bar"
          onClick={() => setShowMobileMenu(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
