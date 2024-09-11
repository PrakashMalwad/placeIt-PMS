import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaCog, FaSignOutAlt, FaUser, FaTimes } from "react-icons/fa";

function Navbar({ role }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "");
        setProfileImage(user.profileImage || "/default-profile.png");
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Use React Router for navigation
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const AdminProfileMenu = () => (
    <div className="relative profile-menu">
      <button
        onClick={toggleProfileMenu}
        className="flex items-center space-x-2"
        aria-label="User Profile Menu"
        aria-haspopup="true"
        aria-expanded={isProfileMenuOpen}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </button>
      {isProfileMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2">
            <li>
              <Link
                to="/admin/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <FaUser className="mr-2 inline" aria-hidden="true" />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
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
  );

  const renderLinks = () => {
    switch (role) {
      case "admin":
        return <AdminProfileMenu />;

      case "student":
        return (
          <div className="relative profile-menu">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2"
              aria-label="User Profile Menu"
              aria-haspopup="true"
              aria-expanded={isProfileMenuOpen}
            >
              <img
                src={profileImage}
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
        );

      case "company":
        return (
          <>
            <li>
              <Link
                to="/company/dashboard"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/company/applications"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Applications
              </Link>
            </li>
            <li>
              <Link
                to="/company/profile"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Profile
              </Link>
            </li>
          </>
        );

      case "placement-cell":
        return (
          <>
            <li>
              <Link
                to="/placement/dashboard"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/placement/drives"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Drives
              </Link>
            </li>
            <li>
              <Link
                to="/placement/profile"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
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
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 transition border-b-2 border-transparent"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Contact
              </Link>
            </li>
          </>
        );
    }
  };

  return (
    <header
      className={`top-0 left-0 w-full bg-white shadow-md z-50 ${
        isScrolled ? "sticky" : "relative"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {userName && (
            <h3>
              Hi, <span className="font-bold">{userName}</span>
            </h3>
          )}
          <ul className="flex items-center space-x-6">{renderLinks()}</ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700"
          aria-label="Toggle Mobile Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="absolute top-14 left-0 w-full bg-white shadow-lg md:hidden">
            <ul className="flex flex-col items-center space-y-4 p-4">
              {renderLinks()}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

Navbar.propTypes = {
  role: PropTypes.string.isRequired,
  subrole: (props, propName, componentName) => {
    if (props.role === "admin" && !props[propName]) {
      return new Error(
        `The prop \`${propName}\` is required when role is "admin" in \`${componentName}\`.`
      );
    }
    return null;
  },
};

export default Navbar;
