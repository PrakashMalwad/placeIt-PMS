import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/admin-dash-comp/sidebar'; // Adjust path accordingly
import { useState, useEffect } from 'react';

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      try {
        const admin = JSON.parse(storedAdmin);
        setAdminName(admin.name); 
      } catch (error) {
        console.error("Failed to parse admin data from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar setIsSidebarOpen={setIsSidebarOpen} role='admin' />
      <div className="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className={`flex-1 p-6 lg:p-12 bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <h1 className="text-3xl font-semibold mb-6 text-left">Welcome, <span className="font-bold">{adminName || 'Admin'}</span></h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer variant="dark" />
    </div>
  );
}

export default AdminDashboard;
