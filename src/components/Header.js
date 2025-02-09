import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa"; // User profile icon

function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <a href="/">
            <img src="/logo_url_shortener.ico" alt="Logo" />
        </a>
        <span>URL Shortener</span>
      </div>

      {/* Navigation Links */}
      <nav className="nav">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/history">Analytics</Link>
        <Link className="nav-link" to="/aboutus">About us</Link>
        <Link className="nav-link" to="/contactus">Contact us</Link>
      </nav> 

      {/* User Profile Icon */}
      <button className="profile-button">
        <FaUserCircle size={30} />
      </button>
    </header>
  );
}

export default Header;
