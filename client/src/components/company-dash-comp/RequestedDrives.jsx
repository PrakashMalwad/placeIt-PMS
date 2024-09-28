import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaTrashAlt } from "react-icons/fa";

const RequestedDrives = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [requestedDrives, setRequestedDrives] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch requested drives
  const fetchRequestedDrives = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/reqDrive/bycompany`);
      setRequestedDrives(response.data);
    } catch (error) {
      setError(`Error fetching requested drives: ${error.message}`);
    }
  };

  // Delete a requested drive
  const handleDeleteDrive = async (driveId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this drive? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${apiUrl}/api/reqDrive/${driveId}`);
      // Remove the deleted drive from the state
      setRequestedDrives((prevDrives) =>
        prevDrives.filter((drive) => drive._id !== driveId)
      );
    } catch (error) {
      setError(`Error deleting drive: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRequestedDrives();
  }, []);

  // Filter drives based on college name
  const filteredDrives = requestedDrives.filter((drive) =>
    drive.college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Requested Drives</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by college..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrives.length > 0 ? (
          filteredDrives.map((drive) => (
            <div
              key={drive._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h1 className="text-sm bg-blue-50 p-2 rounded font-bold">{drive.college.name}</h1>
            
              <h3 className="text-lg font-bold">{drive.jobTitle}</h3>
              <p className="mt-2">
                <strong>Description:</strong> {drive.jobDescription}
              </p>
              <p>
                <strong>Requirements:</strong> {drive.requirements}
              </p>
              <p>
                <strong>Application Deadline:</strong>{" "}
                {new Date(drive.applicationDeadline).toLocaleDateString()}
              </p>
              <p>
                <strong>Salary:</strong> {drive.salary}
              </p>
              <p>
                <strong>Status:</strong> {drive.status}
              </p>
              <div className="flex">
                {drive.scheduledDrive ? (
                  <button
                    onClick={() => navigate(`scheduled-drive/${drive.scheduledDrive}`)} // Navigate to scheduled drive details
                    className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                  >
                    View Scheduled Drive
                  </button>
                ) : (
                  <p className="mt-4 p-2 rounded-md text-gray-500">Not Scheduled</p>
                )}

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteDrive(drive._id)}
                  className="mt-4 ml-2 text-red-600 p-3 rounded-md hover:bg-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No requested drives found for the selected college.</p>
        )}
      </div>
    </div>
  );
};

export default RequestedDrives;
