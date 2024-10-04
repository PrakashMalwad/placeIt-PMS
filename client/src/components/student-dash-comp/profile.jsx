import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResumeModal from '../ResumeModal';
import "react-toastify/dist/ReactToastify.css";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [file, setFile] = useState(null);
  const [resumeFile,setResumeFile]= useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

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
  const handleResumeFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };
  const handleOpenResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const handleCloseResumeModal = () => {
    setIsResumeModalOpen(false);
  };
  const addNewSkill = () => {
    if (window.confirm("Add new skill? Your profile data will be saved.")) {
      handleSubmit();
      navigate("../my-skills");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = updatedProfile.profileImage;
      let resumeUrl = updatedProfile.resume;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await axios.post(
          `${apiUrl}/api/file/upload-profile`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        imageUrl = uploadResponse.data.url;
      }
      if (resumeFile) {
        const formData = new FormData();
        console.log(resumeFile);
        formData.append("file", resumeFile);
        const uploadResponse=
        await axios.post(
          `${apiUrl}/api/file/upload-resume`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        resumeUrl = uploadResponse.data.url;
        
      }

      const updatedData = { ...updatedProfile, profileImg: imageUrl, resume:resumeUrl};
      await axios.put(`${apiUrl}/api/myprofile`, updatedData);
      setProfile(updatedData);
      fetchProfile()
      setIsEditing(false);
      toast.success("Profile updated successfully!");
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
<ToastContainer/>
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
              <span className="text-gray-500">About Me:</span> {profile.aboutme}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Email:</span> {profile.email}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">DOB:</span>{" "}
              {profile.dob ? new Date(profile.dob).toLocaleDateString() : "N/A"}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Age:</span> {profile.age}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Contact:</span>{" "}
              {profile.contactno}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">College:</span>{" "}
              {profile.college?.name}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Qualification:</span>{" "}
              {profile.qualification} 
            </p>
            
            <div className="flex flex-row justify-items-start">
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Resume:</span>{" "}
             
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition duration-200"
          onClick={handleOpenResumeModal}
        >
          Show Resume
        </button>
   
            </p>
      

      {/* Resume Modal */}
      {isResumeModalOpen && (
        
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={handleCloseResumeModal}
          resumeUrl={profile.resume} // Assuming resumeUrl is part of profile
        />
      )}
    </div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Stream:</span> {profile.stream}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Skills:</span>
            </p>
            <ul className="space-y-1 mb-4">
              {profile.skills && profile.skills.length ? (
                profile.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-gray-700 bg-blue-100 rounded-md px-2 py-1 hover:bg-blue-200 transition duration-200"
                  >
                    {skill.skillName} ({skill.proficiency}%)
                  </li>
                ))
              ) : (
                <p className="text-gray-700">No skills added</p>
              )}
            </ul>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="text-gray-500">Eligible:</span>{" "}
              {profile.isEligible ? "Yes" : "No"}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-4">
              <span className="text-gray-500">Placed:</span>{" "}
              {profile.isPlaced ? "Yes" : "No"}
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
          <div>
            <label htmlFor="name" className="block font-semibold">
              Name
            </label>
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
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={profile.email}
            disabled
              className="w-full p-2 border rounded-md bg-blue-100"
            />
            <label htmlFor="email" className="block text-xs text-red-500">
              You can&apos;t change email
            </label>
          </div>

          <div>
            <label htmlFor="aboutme" className="block font-semibold">
              About Me
            </label>
            <textarea
              id="aboutme"
              name="aboutme"
              value={updatedProfile.aboutme}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="dob" className="block font-semibold">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={updatedProfile.dob ? new Date(updatedProfile.dob).toISOString().split('T')[0] : ""}
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
            <label htmlFor="qualification" className="block font-semibold">
              Qualification
            </label>
            <input
              id="qualification"
              type="text"
              name="qualification"
              value={updatedProfile.qualification}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="stream" className="block font-semibold">
              Stream
            </label>
            <input
              id="stream"
              type="text"
              name="stream"
              value={updatedProfile.stream}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
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
          </div><div className="flex flex-col">
            <label htmlFor="resume" className="block font-semibold">
              Resume
            </label>
            <input
              id="resume"
              type="file"
              onChange={handleResumeFileChange}
              className="p-2 border rounded-md"
            />
          </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold">Skills</p>
            {updatedProfile.skills && updatedProfile.skills.length ? (
              updatedProfile.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <div className="w-full">
                    <label
                      htmlFor={`skillName-${index}`}
                      className="block font-semibold"
                    >
                      Skill Name
                    </label>
                    <input
                      id={`skillName-${index}`}
                      type="text"
                      name={`skillName-${index}`}
                      value={skill.skillName}
                      className="w-full p-2 border rounded-md"
                      placeholder="Skill Name"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor={`proficiency-${index}`}
                      className="block font-semibold"
                    >
                      Proficiency %
                    </label>
                    <input
                      id={`proficiency-${index}`}
                      type="number"
                      name={`proficiency-${index}`}
                      value={skill.proficiency}
                      className="w-full p-2 border rounded-md"
                      placeholder="Proficiency %"
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No skills added</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => addNewSkill()}
            className="bg-red-500 text-white px-4 py-2 mr-3 rounded-md"
          >
            Add New Skills
          </button>

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
