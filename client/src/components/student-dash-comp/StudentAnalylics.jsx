import { useState, useEffect } from 'react';
import { FaBell, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import { FaBriefcase, FaMoneyBillWave, FaMapMarkerAlt, FaComments } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function StudentAnalytics() {
  const [performance, setPerformance] = useState({
    appliedJobs: 0,
    interviewsScheduled: 0,
    // offersReceived: 0, // Uncomment if offersReceived is needed later
  });

  const [upcomingDrives, setUpcomingDrives] = useState([]);
 const [studentPlacement, setStudentPlacement] = useState(null);

  // Fetch upcoming drives and performance data
  useEffect(() => {
    const fetchUpcomingDrives = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/drives/byCollege`);
        setUpcomingDrives(response.data || []); // Set drives from API response
      } catch (error) {
        console.error('Error fetching upcoming drives:', error);
      }
    };

    const fetchPerformanceData = async () => {
      try {
        // Assuming these are your endpoints for fetching applications, interviews, and offers
        const applicationsUrl = `${apiUrl}/api/applications/student-count`;
        const interviewsUrl = `${apiUrl}/api/interviews/student-count`;
        const placedUrl = `${apiUrl}/api/placedJob`; 
    
        // Use Promise.all to fetch all data concurrently
        const [applicationsResponse, interviewsResponse,
          placedResponse
        ] = await Promise.all([
          axios.get(applicationsUrl),
          axios.get(interviewsUrl),
          axios.get(placedUrl),
        ]);
    
        // Extract counts from API responses
        const applicationsCount = applicationsResponse.data.count || 0;
        const interviewsCount = interviewsResponse.data.count ;
        console.log(placedResponse.data)
        const offersReceived = placedResponse.data || 0;
        // Update state with the counts
        setPerformance((prev) => ({
          ...prev,
          appliedJobs: applicationsCount,     
          interviewsScheduled: interviewsCount, 
         
        }));
        setStudentPlacement(offersReceived.studentPlacement);
      } catch (error) {
        console.error('Error fetching performance data:', error);
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
                    <span className="text-sm sm:text-base font-bold">{drive.jobtitle} </span>
                    <span className="text-xs sm:text-sm text-gray-500">({drive.companyname})</span>
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
        </div>
      </section>


{studentPlacement ? (
  <section className="mb-6">
    <h3 className="text-xl sm:text-2xl font-semibold mb-2">Placed Job Details</h3>
    <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
      <p className="font-bold text-sm sm:text-lg flex items-center">
        <FaBriefcase className="mr-2 text-blue-500" />
        Company:
        <span className="font-normal ml-2">{studentPlacement.placedCompany.name}</span>
      </p>
      <p className="font-bold text-sm sm:text-lg flex items-center">
        <FaBriefcase className="mr-2 text-blue-500" />
        Job Title: 
        <span className="font-normal ml-2">{studentPlacement.jobTitle}</span>
      </p>
      <p className="font-bold text-sm sm:text-lg flex items-center">
        <FaMoneyBillWave className="mr-2 text-blue-500" />
        Package: 
        <span className="font-normal ml-2">{studentPlacement.package}</span>
      </p>
      <p className="font-bold text-sm sm:text-lg flex items-center">
        <FaMapMarkerAlt className="mr-2 text-blue-500" />
        Location: 
        <span className="font-normal ml-2">{studentPlacement.location}</span>
      </p>
      <p className="font-bold text-sm sm:text-lg flex items-center">
        <FaCalendarAlt className="mr-2 text-blue-500" />
        Joining Date: 
        <span className="font-normal ml-2">{new Date(studentPlacement.joiningDate).toLocaleDateString()}</span>
      </p>
      <p className="font-bold text-sm sm:text-lg flex items-center">
        <FaComments className="mr-2 text-blue-500" />
        Message: 
        <span className="font-normal ml-2">{studentPlacement.message}</span>
      </p>
    </div>
  </section>
) : (
  <p>No placement data available</p>
)}




    </div>
  );
}

export default StudentAnalytics;
