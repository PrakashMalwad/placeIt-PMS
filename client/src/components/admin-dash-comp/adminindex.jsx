import { useEffect, useState } from 'react';
import axios from 'axios';
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

// Fetch the backend URL from the environment variables
const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardIndex = () => {
  const [reportData, setReportData] = useState(null);
  const [GeneralData, setGeneralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/report`);
      const responseGen = await axios.get(`${apiUrl}/api/home/`);
      setGeneralData(responseGen.data);
      setReportData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load report',err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-red-500 text-center text-lg font-semibold">{error}</div>;

  // Chart data preparation
  const userRolesData = {
    labels: reportData.userStats.map(role => role._id),
    datasets: [
      {
        label: 'Users by Role',
        data: reportData.userStats.map(role => role.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const collegeStatsData = {
    labels: reportData.collegeStats.topColleges.map(college => college.collegeName),
    datasets: [
      {
        label: 'Students by College',
        data: reportData.collegeStats.topColleges.map(college => college.studentCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
     <div className="flex p-2 m-5 self-center">
  {/* Main Content */}          
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
    <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold flex items-center justify-center">
        <i className="fas fa-users mr-2"></i> {/* Font Awesome icon for users */}
        Total Users
      </h3>
      <p className="text-2xl">{GeneralData.dailyUsers}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold flex items-center justify-center">
        <i className="fas fa-university mr-2"></i> {/* Icon for colleges */}
        Active Colleges
      </h3>
      <p className="text-2xl">{GeneralData.placementcell}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold flex items-center justify-center">
        <i className="fas fa-briefcase mr-2"></i> {/* Icon for job drives */}
        Total Job Drives
      </h3>
      <p className="text-2xl">{GeneralData.totalDrives}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold flex items-center justify-center">
        <i className="fas fa-building mr-2"></i> {/* Icon for companies */}
        Active Companies
      </h3>
      <p className="text-2xl">{GeneralData.companyregister}</p>
    </div>
</div>

     </div>
        <main className="flex-grow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Users by Role Section */}
            <div className="w-full p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Users by Role</h2>
              <div className="chart" style={{ height: '300px' }}>
                <Bar
                  data={userRolesData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'User Distribution',
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                            }
                            label += context.raw;
                            return label;
                          },
                        },
                      },
                    },
                    animation: {
                      tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
 

            {/* Colleges with Most Students Section */}
            <div className="w-full p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Colleges with Most Students</h2>
              <div className="chart" style={{ height: '300px' }}>
                <Bar
                  data={collegeStatsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Top Colleges',
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                            }
                            label += context.raw;
                            return label;
                          },
                        },
                      },
                    },
                    animation: {
                      tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={fetchReportData}
          >
            Refresh Data
          </button>
        </main>
      </div>
   
  );
};

export default DashboardIndex;
