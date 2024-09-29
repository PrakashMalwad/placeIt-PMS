import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [profile, setProfile] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit modes
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for profile fetch
  const [uploading, setUploading] = useState(false); // Uploading state for image
  const navigate = useNavigate(); // Move useNavigate hook here

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/api/myprofile`)
      .then(response => {
        setProfile(response.data);
        setUpdatedProfile(response.data); // Initialize the updated profile with current data
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the profile!", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


const addNewSkill = () => {
  const confirmed = window.confirm('Are you sure you want to add a new skill, if yes this will direct to my skill and your profile is saved till the data you filled?');
  if (confirmed) {
    handleSubmit()
    navigate('../my-skills');
  }
}



  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = updatedProfile.profileImg;
      
      // If a new file is uploaded, upload it to the server first
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        const uploadResponse = await axios.post(`${apiUrl}/api/file/upload-profile`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadResponse.data.url;
      }

      // Submit updated profile data
      const updatedData = {
        ...updatedProfile,
        profileImg: imageUrl
      };

      await axios.put(`${apiUrl}/api/myprofile`, updatedData);
      setProfile(updatedData); // Update profile
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Profile</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <img
              src={profile.profileImg || 'default-profile.png'}
              alt="Profile"
              className="w-40 h-40 rounded-full mx-auto shadow-lg"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">
              <span className="text-gray-500">Name:</span> {profile.name}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-500">About Me:</span> {profile.aboutme}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-500">DOB:</span> {profile.dob ? new Date(profile.dob).toISOString().substr(0, 10) : ''}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-500">Age:</span> {profile.age}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-500">Contact No:</span> {profile.contactno}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-500">City:</span> {profile.city}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-500">State:</span> {profile.state}
            </p>
            <p className="text-lg font-semibold">
  <span className="text-gray-500">Skills:</span>
  {profile.skills && profile.skills.length > 0 ? (
    <ul className="inline-flex space-x-4">
      {profile.skills.map((skill, index) => (
        <li key={index} className="text-gray-700">
          {skill.skillName} <span className="text-sm text-gray-500">({skill.proficiency}%)</span>
        </li>
      ))}
    </ul>
  ) : (
    <span className="text-gray-700">No skills added</span>
  )}
</p>

            <p className="text-lg font-semibold">
              <span className="text-gray-500">Designation:</span> {profile.designation}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
           <div>
            <label className="block text-gray-700">Name:</label>
            <input
              name="aboutme"
              value={updatedProfile.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">About Me:</label>
            <textarea
              name="aboutme"
              value={updatedProfile.aboutme}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">DOB:</label>
            <input
              type="date"
              name="dob"
              value={updatedProfile.dob ? new Date(updatedProfile.dob).toISOString().substr(0, 10) : ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contact No:</label>
            <input
              type="text"
              name="contactno"
              value={updatedProfile.contactno}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">City:</label>
            <input
              type="text"
              name="city"
              value={updatedProfile.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">State:</label>
            <input
              type="text"
              name="state"
              value={updatedProfile.state}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
  <label className="block text-gray-700">Skills:</label>

  {/* Mapping over the skills array and displaying each skill with proficiency */}
  {updatedProfile.skills.map((skill, index) => (
    <div key={index} className="flex items-center space-x-4 mb-2">
      <input
        type="text"
        name="skillName"
        disabled
        value={skill.skillName}
        placeholder="Skill Name"
        className="w-1/2 p-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        name="proficiency"
        disabled
        value={skill.proficiency}
        placeholder="Proficiency (%)"
        className="w-1/4 p-2 border border-gray-300 rounded-md"
      />
     
    </div>
  ))}

  {/* Button to add new skill */}
  <button
    type="button"
    onClick={addNewSkill}
    className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
  >
    Add Skill
  </button>
</div>

          <div>
            <label className="block text-gray-700">Designation:</label>
            <input
              type="text"
              name="designation"
              value={updatedProfile.designation}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        
          <div>
            <label className="block text-gray-700">Upload Profile Image:</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
              disabled={uploading}
            >
              {uploading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
