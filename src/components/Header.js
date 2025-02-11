import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { FaUserCircle } from 'react-icons/fa';
import AuthContext from '../Utils/authContext';
import './Header.css';

function Header() {
    const { token, logout } = useContext(AuthContext); // Use token instead of isAuthenticated
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setIsDropdownOpen(false); // Close dropdown after navigation
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
        setIsDropdownOpen(false); // Close dropdown after logout
        localStorage.removeItem("token");
    };

    return (
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <Link to="/">
                    <img src="/logo_url_shortener.ico" alt="Logo" />
                </Link>
                <span>URL Shortener</span>
            </div>

            {/* Navigation Links */}
            <nav className="nav">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/history">Analytics</Link>
                <Link className="nav-link" to="/">About us</Link>
                <Link className="nav-link" to="/">Contact us</Link>
            </nav>

            {/* Conditional Rendering based on token */}
            {token ? (
                <div className="profile-dropdown">
                    <button className="profile-button" onClick={toggleDropdown}>
                        <FaUserCircle size={30} />
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleProfileClick}>Profile</button>
                            <hr className="dropdown-separator" />
                            <button onClick={handleLogoutClick}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login" className="signin-button">
                    Sign In
                </Link>
            )}
        </header>
    );
}

export default Header;
