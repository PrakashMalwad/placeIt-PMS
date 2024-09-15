import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/student-dash-comp/sidebar';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role || ""); // Set user role if available
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  if (userRole === "student") {
    return (
      <div className="flex flex-col h-screen">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} role="student" />
        <div className="flex flex-1">
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main
            className={`flex-1 p-3 lg:p-6 bg-gray-100 transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'ml-64' : 'ml-0'
            }`}
          >
            <div className="bg-white p-2 rounded-lg shadow-lg">
              {/* The Outlet component renders the active route's component */}
              <Outlet />
            </div>
          </main>
        </div>
        <Footer variant="dark" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
        <FaExclamationTriangle className="text-red-600 text-6xl mb-4" aria-hidden="true" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Access Denied</h1>
        <p className="text-lg text-gray-600 mb-8">The page you&apos;re looking for is not for you.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    );
  }
}

export default StudentDashboard;
