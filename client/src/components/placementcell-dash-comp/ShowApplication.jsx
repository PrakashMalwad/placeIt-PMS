
import  { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'; // useHistory for navigating back
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ShowApplications() {
  const { driveId } = useParams(); // Assuming you are passing driveId through route params
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // To handle the back button navigation

  // Fetch applications related to a specific drive
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/application/${driveId}`);
        setApplications(response.data.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [driveId]);

  // Handle Back Button
  const handleBack = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applications for Drive: {driveId}</h1>

      {/* Back Button */}
      <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded mb-4">
        Back
      </button>

      {/* Loading Spinner */}
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length > 0 ? (
        <table className="min-w-full table-auto mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Application ID</th>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="border px-4 py-2">{app._id}</td>
                <td className="border px-4 py-2">{app.studentId}</td>
                <td className="border px-4 py-2">{app.status}</td>
                <td className="border px-4 py-2">{new Date(app.appliedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found for this drive.</p>
      )}
    </div>
  );
}

export default ShowApplications;
