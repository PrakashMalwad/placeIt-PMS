import { useState, useEffect } from 'react';
import { FaBell, FaChartBar, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function StudentAnalytics() {
  const [performance, setPerformance] = useState({
    appliedJobs: 0,
    interviewsScheduled: 0,
    offersReceived: 0,
  });

  const [upcomingDrives, setUpcomingDrives] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'New interview scheduled with TechCorp', timestamp: '2024-09-14T10:30:00' },
    { id: '2', message: 'Job application received by Alpha Industries', timestamp: '2024-09-13T08:00:00' },
  ]);

  // Fetch upcoming drives and performance data
  useEffect(() => {
    const fetchUpcomingDrives = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/drives/`);
        setUpcomingDrives(response.data.drives || []); // Set drives from API response
      } catch (error) {
        console.error("Error fetching upcoming drives:", error);
      }
    };

    const fetchPerformanceData = async () => {
      try {
        const currentUser = JSON.parse(sessionStorage.getItem('user'));
        const response = await axios.get(`${apiUrl}/api/applications/student/${currentUser.id}`);
        const applications = response.data.applications || []; // Update according to your API response structure
        setPerformance((prev) => ({
          ...prev,
          appliedJobs: applications.length,
          // You can further process applications to get interviewsScheduled and offersReceived if available
        }));
      } catch (error) {
        console.error("Error fetching student applications:", error);
      }
    };

    fetchUpcomingDrives();
    fetchPerformanceData();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard Overview</h2>

      {/* Upcoming Drives */}
      <section className="mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Upcoming Job Drives</h3>
        {upcomingDrives.length > 0 ? (
          <ul>
            {upcomingDrives.map((drive) => (
              <li key={drive._id} className="mb-3">
                <Link
                  to={`show-drive/drive/${drive._id}`}
                  className="flex justify-between items-center p-3 sm:p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
                >
                  <div>
                    <span className="text-sm sm:text-base font-bold">{drive.company.companyname}</span>
                    <p className="text-xs sm:text-sm">{drive.location}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Eligibility: {drive.eligibilityCriteria}</p>
                  </div>
                  <span className="text-sm sm:text-base">{new Date(drive.date).toLocaleDateString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming drives found.</p>
        )}
      </section>

      {/* Performance Overview */}
      <section className="mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Performance Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-100 p-3 sm:p-4 rounded-lg shadow-sm text-center">
            <FaFileAlt className="text-green-500 text-2xl sm:text-3xl mb-2 mx-auto" />
            <p className="font-bold text-sm sm:text-lg">{performance.appliedJobs}</p>
            <p className="text-xs sm:text-sm">Applied Jobs</p>
          </div>
          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow-sm text-center">
            <FaCalendarAlt className="text-blue-500 text-2xl sm:text-3xl mb-2 mx-auto" />
            <p className="font-bold text-sm sm:text-lg">{performance.interviewsScheduled}</p>
            <p className="text-xs sm:text-sm">Interviews Scheduled</p>
          </div>
          <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow-sm text-center">
            <FaChartBar className="text-yellow-500 text-2xl sm:text-3xl mb-2 mx-auto" />
            <p className="font-bold text-sm sm:text-lg">{performance.offersReceived}</p>
            <p className="text-xs sm:text-sm">Offers Received</p>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Recent Notifications</h3>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification.id} className="mb-3">
                <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                  <FaBell className="text-gray-600 text-xl sm:text-2xl mr-3" />
                  <div>
                    <p className="text-sm sm:text-base">{notification.message}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No recent notifications.</p>
          )}
        </ul>
      </section>
    </div>
  );
}

export default StudentAnalytics;
