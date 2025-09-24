import React, { useState } from "react";
import "./NavBar.css"; // Import CSS
// import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger menu icons
import "./Dropdown.css";

import {Link} from "react-router-dom";
import FindWorkMenu from "./FindWorkMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
        <span className="logo-g">G</span>
          igConnect
        </a>

        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="/" className="nav-links">Home</a>
          </li>
         
         {/* <li className="nav-item">
          <span className="nav-links">Find Work</span>
          <FindWorkMenu/>
         </li> */}

         
          <li className="nav-item">
            <a href="/freelancer" className="nav-links">Freelancers</a>
          </li>
          <li className="nav-item">
            <Link to ="/contact" className="nav-links">Contact</Link>
          </li>
          <li className="nav-item nav-btn">
            <Link to ="/login" className="nav-links btn-login">Login</Link>
          </li>
          <li className="nav-item nav-btn">
            <Link to="/signup" className="nav-links btn-signup">Sign Up</Link>
          </li>
        </ul>
       
      </div>
    </nav>
  );
}