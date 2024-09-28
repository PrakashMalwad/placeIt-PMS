import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ResumeModal from "../ResumeModal";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ShowApplication() {
  const { id } = useParams(); // 'id' is the drive ID
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [drive, setDrive] = useState(null); // To display drive details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedResumeUrl, setSelectedResumeUrl] = useState('');
  const handleViewResume = (resumeUrl) => {
    setSelectedResumeUrl(resumeUrl);
    setIsModalOpen(true);
};

const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResumeUrl(''); // Reset the URL when closing
};

  // Set the authorization token for Axios
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Fetch applications and drive details
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch applications for the specific drive
        const applicationsResponse = await axios.get(
          `${apiUrl}/api/applications/drive/${id}`
        );
        setApplications(applicationsResponse.data);

        // Optionally, fetch drive details
        const driveResponse = await axios.get(`${apiUrl}/api/drives/${id}`);
        setDrive(driveResponse.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!applications || applications.length === 0)
    return (
      <div className="text-center text-gray-500">
        No applications available for this drive.
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-600 focus:outline-none"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {drive ? (
        <h2 className="text-2xl font-bold text-center my-4 text-gray-800">
          Applications for {drive.company.name}
        </h2>
      ) : (
        <h2 className="text-2xl font-bold text-center my-4 text-gray-800">
          Applications
        </h2>
      )}

      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Applied Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td className="border px-4 py-2">
                {application.student.name || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {new Date(application.appliedDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {application.status || "Pending"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleViewResume(application.studentResume)}
                  className="bg-gray-200 p-2 text-blue-500"
                >
                  View Resume
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <ResumeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                resumeUrl={selectedResumeUrl}
            />
        </div>
  );
}

export default ShowApplication;
