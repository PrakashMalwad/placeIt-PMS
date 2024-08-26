import { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [data, setData] = useState({
    totalDrives: 0,
    jobOffers: 0,
    resumes: 0,
    dailyUsers: 0
  });

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('/home');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching statistics data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="statistics" className="statistics py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Key Metrics</h1>
          <p className="text-lg text-gray-600">Here&rsquo;s a snapshot of our most important statistics</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-8 text-white text-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-4xl font-bold mb-2">{data.totalDrives}</h3>
            <p className="text-lg font-medium">Total Drives</p>
          </div>
          <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-8 text-white text-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-4xl font-bold mb-2">{data.jobOffers}</h3>
            <p className="text-lg font-medium">Job Offers</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 p-8 text-white text-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-4xl font-bold mb-2">{data.resumes}</h3>
            <p className="text-lg font-medium">CV / Resume</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 p-8 text-white text-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-4xl font-bold mb-2">{data.dailyUsers}</h3>
            <p className="text-lg font-medium">Daily Users</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
