import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaUser, FaDashcube, FaTimes } from "react-icons/fa";

function Navbar({ role }) {
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "");
        setProfileImage(user.profileImage || "/default-profile.png");
        setIsLoggedIn(true); // User is logged in if user data exists
      } catch (error) {
        console.error("Failed to parse user data from sessionStorage:", error);
      }
    }
  }, []);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false); // Set logged in status to false
    navigate("/signin"); // Redirect to Sign In page after logging out
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

  const ProfileMenu = () => (
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
                to={`/${role}/dashboard/profile`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <FaUser className="mr-2 inline" aria-hidden="true" />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to={`/${role}/dashboard`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <FaDashcube className="mr-2 inline" aria-hidden="true" />
                Dashboard
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
    if (isLoggedIn) {
      return <ProfileMenu />;
    } else {
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
  className={`top-0 left-0 w-full bg-zinc-50 shadow-md z-50 ${
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

    {/* Mobile Menu Button (visible only when not logged in) */}
    {!isLoggedIn && (
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-gray-700"
        aria-label="Toggle Mobile Menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    )}

    {/* Mobile Profile Menu when logged in */}
    {isLoggedIn && !isMobileMenuOpen && (
      <div className="md:hidden">
        <ProfileMenu />
      </div>
    )}

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
};

export default Navbar;
