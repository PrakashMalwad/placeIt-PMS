import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaEdit} from 
'react-icons/fa';
import { AiTwotoneEdit } from "react-icons/ai";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const AdminProfile = () => {
  const [profile, setProfile] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/api/myprofile`)
      .then(response => {
        setProfile(response.data);
        setUpdatedProfile(response.data);
        console.log(response.data)
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = updatedProfile.profileImg;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await axios.post(`${apiUrl}/api/file/upload-profile`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadResponse.data.url;
      }

      const updatedData = { ...updatedProfile, profileImg: imageUrl };

      await axios.put(`${apiUrl}/api/myprofile`, updatedData);
      setProfile(updatedData);
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Admin Profile</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div>
              <FaEdit />
              
            </div>
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
              <span className="text-gray-500">Subrole:</span> {profile.subrole}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-500">Permissions:</span> {profile.permissions||'N/A'}
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
            <button
              className="mt-4 flex item-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => setIsEditing(true)}
            >
             <AiTwotoneEdit/> Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Include other fields similar to the User Profile component */}
          <div>
            <label className="block text-gray-700">Subrole:</label>
            <select
              name="subrole"
              value={updatedProfile.subrole}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="placementcelladmin">Placement Cell Admin</option>
              <option value="companyadmin">Company Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Permissions:</label>
            <input
              type="text"
              name="permissions"
              value={updatedProfile.permissions}
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
            <label className="block text-gray-700">Upload Profile Image:</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {/* Include additional fields like Contact No, City, State */}
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

export default AdminProfile;
