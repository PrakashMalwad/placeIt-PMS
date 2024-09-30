import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarCheck, FaSignOutAlt, FaBars, FaTimes, FaGraduationCap, FaCogs, FaUsers, FaAccusoft, FaCampground, FaBuilding } from 'react-icons/fa';

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const linkClasses = 'flex items-center p-3 text-gray-700 hover:text-purple-700 hover:bg-gray-200 rounded transition duration-150 ease-in-out';
  const activeLinkClasses = 'bg-white border-l-4 border-blue-500 text-blue-500';

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        aria-label="Toggle Sidebar"
        className="md:hidden bg-transparent border-blue-300 border-2 rounded-full fixed top-5 left-1 z-50 p-2 translate-y-12 tra text-blue-600"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <FaTimes className="text-sm" aria-hidden="true" />
        ) : (
          <FaBars className="text-sm" aria-hidden="true" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 w-64 h-full bg-gray-100 p-6 shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-y-12 ' : '-translate-x-64'} md:translate-x-0 md:static`}>

        
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="./"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaUser className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-users"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaUsers className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Manage Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-drive"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaGraduationCap className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm"> Manage Drive</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="showEnquiries"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaAccusoft className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm"> Show Enquiries</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-college"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaCampground className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm"> Manage College</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="manage-company"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaBuilding className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm"> Manage Company</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="reports"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaCalendarCheck className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="settings"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaCogs className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Settings</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-3 text-gray-700 hover:text-red-600 hover:bg-gray-200 rounded transition duration-150 ease-in-out"
              >
                <FaSignOutAlt className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

// Define PropTypes for the Sidebar component
Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
