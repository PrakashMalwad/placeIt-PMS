import { useState, useEffect } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null); // Store student data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch student data based on authenticated user
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('/api/student/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          }
        });
        setStudentData(response.data); 
        setLoading(false); 
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to fetch student profile data.');
        setLoading(false); 
      }
    };

    fetchStudentData();
  }, []); 

  // Display loading message
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading profile...</h2>
      </div>
    );
  }

  // Display error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  // Render profile if data is available
  return (
    <>
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <img
              src={studentData.profileImage || 'default-profile.png'}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover mb-4"
            />

            {/* Student Name */}
            <h2 className="text-2xl font-semibold text-gray-800">{studentData.name}</h2>

            {/* Contact Info */}
            <p className="text-gray-600">{studentData.email}</p>
            <p className="text-gray-600">{studentData.contactNo}</p>

            {/* Profile Information */}
            <div className="mt-6 w-full text-left">
              <h3 className="font-semibold text-lg text-gray-700">Profile Information</h3>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="font-medium text-gray-600">College:</span> {studentData.college}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Course:</span> {studentData.course}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Year:</span> {studentData.year}
                </div>
                <div>
                  <span className="font-medium text-gray-600">CGPA:</span> {studentData.cgpa}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-6 w-full text-left">
              <h3 className="font-semibold text-lg text-gray-700">Skills</h3>
              <div className="mt-2">
                {studentData.skills && studentData.skills.length > 0 ? (
                  studentData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span>No skills listed</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
