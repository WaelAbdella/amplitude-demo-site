import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Receive props for dev mode state and toggle function
const Navbar = ({ isDevMode, toggleDevMode }) => {

  // Function to determine NavLink className for active state
  // We'll target .nav-link and .nav-link.active in CSS
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        {/* Logo/Brand Placeholder */}
        <Link to="/" className="navbar-brand">
          Convz Demo
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav">
          <li><NavLink to="/" className={getNavLinkClass}>Home</NavLink></li>
          <li><NavLink to="/features" className={getNavLinkClass}>Features</NavLink></li>
          <li><NavLink to="/pricing" className={getNavLinkClass}>Pricing</NavLink></li>
          <li><NavLink to="/signup-login" className={getNavLinkClass}>Signup/Login</NavLink></li>
          <li><NavLink to="/about-contact" className={getNavLinkClass}>About/Contact</NavLink></li>
        </ul>

        {/* Developer Toggle Button */}
        <button
          onClick={toggleDevMode}
          className={`btn btn-secondary btn-sm navbar-dev-toggle ${isDevMode ? 'active' : ''}`}
          aria-pressed={isDevMode}
        >
          Dev Mode: {isDevMode ? 'ON' : 'OFF'}
        </button>
      </div>
    </nav>
  );
};

// Add basic Navbar CSS to index.css or a separate Navbar.css
/*
.navbar {
  background-color: #ffffff; 
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
  position: fixed; / * Or sticky * /
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0d6efd; / * Brand color * /
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  gap: 1rem; / * Spacing between links * /
}

.nav-link {
  color: #495057;
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.nav-link:hover {
  color: #0d6efd;
  text-decoration: none;
}

.nav-link.active {
  color: #0d6efd;
  font-weight: 500;
  border-bottom-color: #0d6efd;
}

.navbar-dev-toggle {
   padding: 0.25rem 0.75rem; / * Smaller padding for sm button * /
   font-size: 0.875rem;
}

.navbar-dev-toggle.active {
  background-color: #ffc107; / * Example active color * /
  border-color: #ffc107;
  color: #000;
}
*/

export default Navbar; 