import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/myprofile`);
      setProfile(response.data);
      setUpdatedProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile!", error);
      setErrorMessage("Failed to fetch profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setLoading(true);
    fetchProfile();
    
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
      let imageUrl = updatedProfile.profileImage;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await axios.post(
          `${apiUrl}/api/file/upload-profile`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = uploadResponse.data.url;
      }

      const updatedData = {
        ...updatedProfile,
        profileImg: imageUrl,
      };

      await axios.put(`${apiUrl}/api/myprofile`, updatedData);
      setProfile(updatedData);
      setIsEditing(false);
      fetchProfile();
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      
    } catch (error) {
      console.error("Error updating profile!", error);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Profile</h2>
      <ToastContainer />
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white-100 ">
          <div className="text-center m-2 items-center ">
            <img
              src={profile.profileImg || 'default-profile.png'}
              alt="Profile"
              className="w-50 h-50 rounded-full mx-auto shadow-lg border-4 border-blue-200"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-2xl font-semibold text-blue-600 mb-2">
              <span className="text-gray-500">Name:</span> {profile.name}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Designation:</span> {profile.designation}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Company:</span> {profile.company?.companyname}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Department:</span> {profile.department}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">City:</span> {profile.city}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">State:</span> {profile.state}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Country:</span> {profile.country}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Pincode:</span> {profile.pincode}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          {/* Input fields for profile editing */}
          <div>
            <label htmlFor="name" className="block font-semibold">Name</label>
            <input
              id="name"
              name="name"
              value={updatedProfile.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="designation" className="block font-semibold">
              Designation
            </label>
            <input
              id="designation"
              type="text"
              name="designation"
              value={updatedProfile.designation}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block font-semibold">
              Company
            </label>
            <input
              id="company"
              type="text"
              name="company"
              value={updatedProfile.company?.companyname}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              
              disabled
            />
          </div>

          <div>
            <label htmlFor="department" className="block font-semibold">
              Department
            </label>
            <input
              id="department"
              type="text"
              name="department"
              value={updatedProfile.department}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block font-semibold">
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={updatedProfile.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="block font-semibold">
              State
            </label>
            <input
              id="state"
              type="text"
              name="state"
              value={updatedProfile.state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="country" className="block font-semibold">
              Country
            </label>
            <input
              id="country"
              type="text"
              name="country"
              value={updatedProfile.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="pincode" className="block font-semibold">
              Pincode
            </label>
            <input
              id="pincode"
              type="text"
              name="pincode"
              value={updatedProfile.pincode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* File input for Profile Image */}
          <div className="flex flex-col">
            <label htmlFor="profileImage" className="block font-semibold">
              Profile Image
            </label>
            <input
              id="profileImage"
              type="file"
              onChange={handleFileChange}
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
              disabled={uploading}
            >
              {uploading ? "Updating..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-200"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
