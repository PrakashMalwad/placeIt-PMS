import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DriveContext } from './DriveContext'; // Import context
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const ViewDriveRequest = () => {
  const [driveRequests, setDriveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setSelectedDrive } = useContext(DriveContext); // Use context
  const navigate = useNavigate();

  const fetchDriveRequests = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/reqDrive/request`);
      setDriveRequests(response.data);
    } catch (err) {
      console.error("Error fetching drive requests:", err);
      setError("Failed to load drive requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriveRequests();
  }, []);

  const handleAcceptRequest = async (requestId, driveDetails) => {
    try {
      await axios.put(`${apiUrl}/api/reqDrive/status/`, {
        reqdrive: requestId,
        status: "accepted",
      });

      // Set the selected drive to fill in the ManageJobDrives form
      setSelectedDrive(driveDetails);

      // Optionally fetch the updated drive requests
      fetchDriveRequests();
      navigate("/placementcell-coordinator/dashboard/manage-drive");
    } catch (err) {
      console.error("Error updating request status:", err);
      alert("Failed to accept the request.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2 text-center">Job Drive Requests</h1>
      {driveRequests.length === 0 ? (
        <p className="text-center text-gray-500">No drive requests available at the moment.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {driveRequests.map((request) => (
            <div key={request._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{request.company.companyname}</h2>
              <h3 className="text-lg font-semibold text-gray-600">{request.jobTitle}</h3>
              <p className="text-gray-600 mb-2">{request.jobDescription}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p><strong>Requirements:</strong> {request.requirements}</p>
                <p><strong>Location:</strong> {request.company.city}, {request.company.state}</p>
                <p><strong>Application Deadline:</strong> {new Date(request.applicationDeadline).toLocaleDateString()}</p>
                <p><strong>Salary:</strong> {request.salary}</p>
              </div>
              <button
                onClick={() => handleAcceptRequest(request._id, request)} // Pass drive data
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Accept Request
              </button>
              {request.status && <p className="mt-4 text-sm text-gray-500">Status: {request.status}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDriveRequest;
