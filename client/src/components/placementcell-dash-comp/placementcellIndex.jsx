import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserGraduate, FaBriefcase, FaCheckCircle, FaUniversity } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const PlacementCellOverview = () => {
  // State to store data metrics
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    totalDrives: 0,
    totalPlacedStudents: 0,
  });

  // Fetch metrics from API
  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await axios.get(`${apiUrl}/api/statistics/bycollege`);
      const data = response.data[0];
      setMetrics(data);
    };

    fetchMetrics();
  }, []);

  // Data for the Bar chart
  const data = {
    labels: ['Total Students', 'Total Drives', 'Students Placed'],
    datasets: [
      {
        label: 'Placement Stats',
        data: [metrics.totalStudents, metrics.totalDrives, metrics.totalPlacedStudents],
        backgroundColor: ['#4A90E2', '#7ED321', '#BD10E0'],
      },
    ],
  };

  // Options for the Bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure it resizes well on mobile
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Placement Statistics Overview',
      },
    },
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Dashboard Overview
      </h1>

      {/* Overview Stats Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{metrics.totalStudents}</p>
        </div>

        {/* Total Drives */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Drives</h3>
          <p className="text-2xl md:text-3xl font-bold text-green-600">{metrics.totalDrives}</p>
        </div>

        {/* Students Placed */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Students Placed</h3>
          <p className="text-2xl md:text-3xl font-bold text-purple-600">{metrics.totalPlacedStudents}</p>
        </div>
      </div>

      {/* Graph Section */}
      <div className="mt-10 p-6 bg-blue-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Placement Stats Overview</h2>
        <div className="w-full h-64">
          <Bar data={data} options={options} />
        </div>
      </div>

      {/* Functional Links Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-blue-50 p-5 mt-10 shadow-lg">
        {/* Manage Students */}
        <Link
          to="manage-students"
          className="bg-white p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
        >
          <div className="flex items-center">
            <FaUserGraduate className="text-blue-500 text-3xl md:text-4xl mr-4" />
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">Manage Students</h2>
              <p className="text-gray-600">Add, edit, and view student information</p>
            </div>
          </div>
        </Link>

        {/* Manage Drives */}
        <Link
          to="manage-drive"
          className="bg-white p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
        >
          <div className="flex items-center">
            <FaBriefcase className="text-green-500 text-3xl md:text-4xl mr-4" />
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">Manage Drives</h2>
              <p className="text-gray-600">Create, update, and view placement drives</p>
            </div>
          </div>
        </Link>

        {/* View Drive Requests */}
        <Link
          to="view-drive-request"
          className="bg-white p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
        >
          <div className="flex items-center">
            <FaCheckCircle className="text-purple-500 text-3xl md:text-4xl mr-4" />
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">View Drive Requests</h2>
              <p className="text-gray-600">Review and approve student applications</p>
            </div>
          </div>
        </Link>

        {/* Generate College Code */}
        <Link
          to="get-college-code"
          className="bg-white p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
        >
          <div className="flex items-center">
            <FaUniversity className="text-yellow-500 text-3xl md:text-4xl mr-4" />
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">Generate College Code</h2>
              <p className="text-gray-600">Generate unique college codes for students</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PlacementCellOverview;
