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
      fetchProfile()
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
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Profile</h2>
      <ToastContainer />
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white-100 rounded-lg shadow-lg">
          <div className="text-center m-2 items-center ">
            <img
              src={profile.profileImg || "default-profile.png"}
              alt="Profile"
              className="w-50 h-50 rounded-full mx-auto shadow-lg border-4 border-blue-200"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-2xl font-semibold text-blue-600 mb-2">
              <span className="text-gray-500">Name:</span> {profile.name}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">College:</span>{" "}
              {profile.college?.name}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Email:</span> {profile.email}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Department:</span>{" "}
              {profile.department}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Contact:</span>{" "}
              {profile.contactno}
            </p>

            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">RoleDescription:</span>{" "}
              {profile.roleDescription}
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
            <label htmlFor="contactno" className="block font-semibold">
              Contact Number
            </label>
            <input
              id="contactno"
              type="text"
              name="contactno"
              value={updatedProfile.contactno}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="roleDescription" className="block font-semibold">
              Role Description
            </label>
            <input
              id="roleDescription"
              type="text"
              name="roleDescription"
              value={updatedProfile.roleDescription}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* File input */}
          <div className="flex flex-row justify-items-start">
            <div className="flex flex-col mr-2">
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
          </div>
        

          {/* Submit button */}
          <button
            type="submit"
            disabled={uploading}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            {uploading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
