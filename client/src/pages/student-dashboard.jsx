import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/student-dash-comp/Sidebar';
import { useState, useEffect } from 'react';

function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name); 
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar setIsSidebarOpen={setIsSidebarOpen} role='student' />
      <div className="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className={`flex-1 p-6 lg:p-12 bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <h1 className="text-3xl font-semibold mb-6 text-left">Welcome, <span className="font-bold">{userName || 'User'}</span></h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* The Outlet component renders the active route's component */}
            <Outlet />
          </div>
        </main>
      </div>
      <Footer variant="dark" />
    </div>
  );
}

export default StudentDashboard;
