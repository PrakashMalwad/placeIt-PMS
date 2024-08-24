import { useState } from "react";
import Logo from "../assets/img/logo.png";

import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function DashNavbar({ setIsSidebarOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSidebarOpen(!isMenuOpen); // Toggle sidebar when the menu opens/closes
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <nav className={`md:flex md:items-center md:w-auto ${isMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
DashNavbar.propTypes = {
    setIsSidebarOpen: PropTypes.func.isRequired,
  };
  
export default DashNavbar;
