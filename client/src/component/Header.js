import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/Bulb-Studios.png"

const Header = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a
        className="navbar-brand"
        href="https://bulbstudios.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} width="60" height="60" alt="bulbstudios.com" />
      </a>
      <Link to="/" className="navbar-brand">
        To Dos App
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Todos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Create Todo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
