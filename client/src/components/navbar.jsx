import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';

function Navbar({ role }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = '/'; // Redirect to home or sign-in page
  };

  const renderLinks = () => {
    switch (role) {
      case 'student':
        return (
          <>
            <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2"
              aria-label="User Profile Menu"
            >
              <img
                src="/path/to/profile-photo.jpg"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/student/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FaUser className="mr-2 inline" aria-hidden="true" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/student/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FaCog className="mr-2 inline" aria-hidden="true" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    >
                      <FaSignOutAlt className="mr-2 inline" aria-hidden="true" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          </>
        );
      case 'company':
        return (
          <>
            <li>
              <Link
                to="/company/dashboard"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/company/applications"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Applications
              </Link>
            </li>
            <li>
              <Link
                to="/company/profile"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Profile
              </Link>
            </li>
          </>
        );
      case 'placement-cell':
        return (
          <>
            <li>
              <Link
                to="/placement/dashboard"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/placement/drives"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Drives
              </Link>
            </li>
            <li>
              <Link
                to="/placement/profile"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Profile
              </Link>
            </li>
          </>
        );
      default:
        return (
          <>
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
              >
                Contact
              </Link>
            </li>
          </>
        );
    }
  };

  return (
    <header className="top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            {renderLinks()}
          </ul>

          
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Navbar;
  