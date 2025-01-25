import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Navbar</h1>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/posts" className="navbar-link">
              Posts
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/users" className="navbar-link">
              Users
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
