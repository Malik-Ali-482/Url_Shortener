import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h4>About URL Shortener</h4>
          <p>
            A professional tool to create short, memorable links and manage URL analytics with ease.
            Perfect for individuals and businesses alike.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/history">Analytics</a>
          <a href="/">About Us</a>
          <a href="/history">Contact Us</a>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@urlshortener.com</p>
          <p>Phone: +1 (234) 567-890</p>
          <p>Address: 123 Shorten St., Link City, USA</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div class="divider"></div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} URL Shortener. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
