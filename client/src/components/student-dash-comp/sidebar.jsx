
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaTools, FaCalendarCheck, FaGraduationCap, FaSignOutAlt, FaBars, FaTimes, FaClipboardList } from 'react-icons/fa';

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const linkClasses = "flex items-center p-3 text-gray-700 hover:text-purple-700 hover:bg-gray-200 rounded transition duration-150 ease-in-out";
  const activeLinkClasses = "bg-white border-l-4 border-blue-500 text-blue-500";

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        aria-label="Toggle Sidebar"
        className="md:hidden static top-4 left-4 z-50 p-2 text-gray-600"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes className="text-xl" aria-hidden="true" /> : <FaBars className="text-xl" aria-hidden="true" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 w-64 h-full bg-gray-100 p-6 shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-y-12 ' : '-translate-x-64'} md:translate-x-0 md:static`}>
       
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to=". "
                className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}
              >
                <FaUser className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="show-drive"
                className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}
              >
                <FaGraduationCap className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Show Active Drive</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="my-applications"
                className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}
              >
                <FaClipboardList className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">My Applications</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="my-skills"
                className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}
              >
                <FaTools className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">My Skills</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="interviews"
                className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}
              >
                <FaCalendarCheck className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Interviews</span>
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
