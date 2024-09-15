import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBriefcase,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaCalendarCheck,
} from "react-icons/fa";

function CompanyDashboard() {
  const [companyName] = useState(" ");

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; //
  };

  const linkClasses =
    "flex items-center p-3 text-gray-700 hover:text-blue-700 hover:bg-gray-200 rounded transition duration-150 ease-in-out";
  const activeLinkClasses = "bg-white border-l-4 border-blue-500 text-blue-500";

  return (
    <div className="flex flex-col h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-gray-100 p-6 shadow-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">
            Welcome, <span className="font-bold">{companyName}</span>
          </h3>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaBriefcase className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-drives"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaCalendarCheck className="mr-3 text-xl" aria-hidden="true" />
                <span className="text-sm">Manage Drives</span>
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
                to="settings"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
              >
                <FaCog className="mr-3 text-xl" aria-hidden="true" />
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6">Company Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Content goes here */}
          <p>
            Welcome to the Company Dashboard! Manage job drives, view user
            statistics, and configure company settings.
          </p>
        </div>
      </main>
    </div>
  );
}

export default CompanyDashboard;
