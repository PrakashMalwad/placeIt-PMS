import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/placementcell-dash-comp/sidebar'; 
import { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

const PlacementCellDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Effect to fetch user data from localStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role || ""); // Set user role if available
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  // Render based on user role
  if (userRole === "placementcell-coordinator") {
    return (
      <div className="flex flex-col h-screen">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} role='placementcell-coordinator' />
        <div className="flex flex-1">
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className={`flex-1 p-6 lg:p-12 bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer variant="dark" />
      </div>
    );
  } else {
    return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
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
      </>
    );
  }
};

export default PlacementCellDashBoard;
