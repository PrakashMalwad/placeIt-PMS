import { useState, useEffect } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  
  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          }
        });
        setStudentData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student data:', err);
        const errorMessage = err.response?.status === 404 
          ? 'Student profile not found.' 
          : 'Failed to fetch student profile data.';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(`/api/users/upload/${studentData._id}/profile-image`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // Update the studentData with the new profile image
      setStudentData((prevData) => ({
        ...prevData,
        profileImage: response.data.profileImage,
      }));
      alert('Profile image uploaded successfully!');
    } catch (err) {
      console.error('Error uploading profile image:', err);
      setError('Failed to upload profile image.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <div className="flex flex-col items-center">
          <img
            src={studentData.profileImage || 'default-profile.png'}
            alt={`${studentData.name}'s profile`}
            className="rounded-full w-32 h-32 object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{studentData.name}</h2>
          <p className="text-gray-600">{studentData.email}</p>
          <p className="text-gray-600">{studentData.contactNo}</p>

          {/* Profile image upload form */}
          <form onSubmit={handleUpload} className="mt-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="mb-4"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Upload Profile Image
            </button>
          </form>

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
  );
};

export default StudentProfile;
