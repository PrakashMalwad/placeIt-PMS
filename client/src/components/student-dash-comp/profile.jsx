import { useState, useEffect } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null); // Store student data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditing, setIsEditing] = useState(false); // Edit state
  

  // Fetch student data based on authenticated user
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('/api/students', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          }
        });
        
        if (response.headers['content-type'].includes('application/json')) {
          const data = response.data[0]; // Get the first element of the array
          setStudentData(data);
        } else {
          console.error("Response is not JSON", response.data);
          setError('Invalid data format received');
        }

        setLoading(false); 
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to fetch student profile data.');
        setLoading(false); 
      }
    };

    fetchStudentData();
  }, []); 

  // Update student data
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/students/${studentData.id}`, studentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
      });
      setStudentData(response.data);
      setIsEditing(false); // Turn off editing mode
    } catch (error) {
      console.error("Error updating student data:", error);
      setError("Failed to update student profile data.");
    }
  };

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

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

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <img
              src={studentData.profileImg || 'default-profile.png'}
              alt="profile"
              className="rounded-full w-32 h-32 object-cover mb-4"
            />

            {/* Student Name */}
            <h2 className="text-2xl font-semibold text-gray-800">{studentData.name}</h2>

            {/* Contact Info */}
            <p className="text-gray-600">{studentData.email}</p>
            <p className="text-gray-600">{studentData.contactno}</p>

            {/* Profile Information */}
            {isEditing ? (
              <div className="mt-6 w-full text-left">
                <h3 className="font-semibold text-lg text-gray-700">Edit Profile Information</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <label className="font-medium text-gray-600">About Me:</label>
                    <textarea
                      name="aboutme"
                      value={studentData.aboutme || ''}
                      onChange={handleChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-600">Contact No:</label>
                    <input
                      type="text"
                      name="contactno"
                      value={studentData.contactno || ''}
                      onChange={handleChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-600">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={studentData.address || ''}
                      onChange={handleChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-600">Skills:</label>
                    <input
                      type="text"
                      name="skills"
                      value={studentData.skills || ''}
                      onChange={handleChange}
                      className="border p-2 w-full"
                    />
                  </div>
                </div>

                {/* Update Button */}
                <button
                  onClick={handleUpdate}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                {/* Cancel Button */}
                <button
                  onClick={() => setIsEditing(false)}
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mt-6 w-full text-left">
                <h3 className="font-semibold text-lg text-gray-700">Profile Information</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="font-medium text-gray-600">About Me:</span> {studentData.aboutme}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Contact No:</span> {studentData.contactno}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Address:</span> {studentData.address}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Skills:</span> {studentData.skills}
                  </div>
                </div>
                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
