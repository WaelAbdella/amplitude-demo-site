import React from 'react';
import { Link } from 'react-router-dom';

// Receive props for dev mode state and toggle function
const Navbar = ({ isDevMode, toggleDevMode }) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center"> {/* Use flexbox */}
      <ul className="flex space-x-4 text-white">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/features" className="hover:text-gray-300">Features</Link></li>
        <li><Link to="/pricing" className="hover:text-gray-300">Pricing</Link></li>
        <li><Link to="/signup-login" className="hover:text-gray-300">Signup/Login</Link></li>
        <li><Link to="/about-contact" className="hover:text-gray-300">About/Contact</Link></li>
      </ul>
      {/* Developer Toggle Button */}
      <button
        onClick={toggleDevMode}
        className={`text-xs px-3 py-1 rounded ${
          isDevMode ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
        } text-white`}
      >
        Dev Mode: {isDevMode ? 'ON' : 'OFF'}
      </button>
    </nav>
  );
};

export default Navbar; 