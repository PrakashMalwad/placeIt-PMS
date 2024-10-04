import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ResumeModal from "../ResumeModal";

const ScheduledDrive = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const  {applicationId:id}  = useParams();
  const [driveDetails, setDriveDetails] = useState(null);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResumeUrl, setSelectedResumeUrl] = useState(null);
  const navigate = useNavigate();

  const fetchDriveData = async () => {
    try {
      const [driveRes, appsRes] = await Promise.all([
        axios.get(`${apiUrl}/api/drives/get/${id}`),
        axios.get(`${apiUrl}/api/applications/drive/${id}`)
      ]);
      setDriveDetails(driveRes.data);
      setApplications(appsRes.data);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    fetchDriveData();
  }, [id]);

  const openResumeModal = (resumeUrl) => {
    setSelectedResumeUrl(resumeUrl);
    console.log(applications.student);
    setIsModalOpen(true);
  };

  const closeResumeModal = () => {
    setIsModalOpen(false);
    setSelectedResumeUrl(null);
  };

  const handleScheduleInterview = (applicationId) => {
    navigate(`/company-coordinator/dashboard/schedule-interview/${applicationId}`); // Redirect to the interview scheduling page
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-500">{error}</p>}

      {driveDetails ? (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{driveDetails.jobTitle}</h2>
          <p className="mt-4 text-gray-700">
            <strong>Description:</strong> {driveDetails.jobDescription}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Requirements:</strong> {driveDetails.requirements}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Location:</strong> {driveDetails.location}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Date:</strong> {new Date(driveDetails.date).toLocaleDateString()}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Time:</strong> {driveDetails.time}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Salary:</strong> {driveDetails.salary}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            Back
          </button>
        </div>
      ) : (
        <p>Drive details not found.</p>
      )}

      <h3 className="text-2xl font-bold mt-10 mb-6 text-gray-800">Applications for this Drive</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div
              key={application._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow"
            >
              <h4 className="text-xl font-semibold text-gray-800">
                Application ID: {application._id}
              </h4>
              <p className="mt-3 text-gray-700">
                <strong>Student:</strong> {application.student.name}
              </p>
              <p className="mt-3 text-gray-700">
  <strong>Skills:</strong>
</p>
<div className="flex flex-wrap mt-2">
  {application.student.skills && application.student.skills.length > 0 ? (
    application.student.skills.map((skill, index) => (
      <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg m-1">
        {skill.skillName}
      </div>
    ))
  ) : (
    <p className="text-gray-500">No skills listed.</p>
  )}
</div>


              <p className="mt-2 text-gray-700">
                <strong>Status:</strong> {application.status}
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Resume:</strong> 
                <button
                  className="text-blue-500 underline"
                  onClick={() => openResumeModal(application.student.resume)}
                >
                  View Resume
                </button>
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Applied On:</strong> {new Date(application.appliedDate).toLocaleDateString()}
              </p>

              {/* Schedule Interview Button */}
              <button
                onClick={() => handleScheduleInterview(application._id)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Schedule Interview
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No applications found for this drive.</p>
        )}
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isModalOpen}
        onClose={closeResumeModal}
        resumeUrl={selectedResumeUrl}
      />
    </div>
  );
};

export default ScheduledDrive;
