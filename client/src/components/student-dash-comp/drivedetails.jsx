import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function DriveDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState(null);
  const [applicationError, setApplicationError] = useState(null); // Separate error for checking application status
  const [successMessage, setSuccessMessage] = useState(null);
  const [hasApplied, setHasApplied] = useState(false); // New state for tracking application status
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default header for all Axios requests
    }
  }, []);
  useEffect(() => {
    const fetchDriveDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/api/drives/${id}`);
        setDrive(response.data);
      } catch (err) {
        console.error('Failed to fetch drive details:', err);
        setError('Failed to fetch drive details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const checkIfApplied = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (!user || !user.id) {
          throw new Error('You need to be logged in to check application status.');
        }

        const response = await axios.get(`${apiUrl}/api/applications/student/${user.id}`);
        console.log(response.data); // Log the response to debug the structure
        const applied = response.data.some(application => {
          const driveId = application.drive?._id || application.drive?.id || application.drive;
          return driveId && driveId.toString() === id;
        });

        setHasApplied(applied);
      } catch (err) {
        console.error('Failed to check application status:', err);
        setApplicationError('Failed to check application status. Please try again later.');
      }
    };

    fetchDriveDetails();
    checkIfApplied();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));

      if (!user || !user.id) {
        throw new Error('You need to be logged in to apply.');
      }

      if (hasApplied) {
        throw new Error('You have already applied for this drive.');
      }

      const application = {
        student: user.id,
        drive: id,
        appliedDate: new Date().toISOString(),
        studentResume: '', // Add a resume field if needed
      };

      await axios.post(`${apiUrl}/api/applications`, application);
      setSuccessMessage('Applied successfully!');
      setHasApplied(true); // Update the state to reflect that the student has applied
    } catch (err) {
      console.error('Error applying for drive:', err);
      setError(err.response?.data?.message || 'Failed to apply. Please try again later.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!drive) return <div className="text-center text-gray-500">No drive details available.</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-600 focus:outline-none"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h2 className="text-2xl font-bold text-center my-4 text-gray-800">{drive.company.companyname}</h2>
      <p><strong>Date:</strong> {new Date(drive.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {drive.location}</p>
      <p><strong>Eligibility Criteria:</strong> {drive.eligibilityCriteria}</p>
      <p><strong>Application Deadline:</strong> {new Date(drive.applicationDeadline).toLocaleDateString()}</p>
      <p><strong>Contact Person:</strong> {drive.contactPerson}</p>

      {applicationError && <div className="text-center text-red-500 mt-4">{applicationError}</div>}
      {successMessage && <div className="text-center text-green-500 mt-4">{successMessage}</div>}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none ${
          applying ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleApply}
        disabled={applying || hasApplied} // Disable button if already applied
      >
        {applying ? 'Applying...' : hasApplied ? 'Already Applied' : 'Apply'}
      </button>
    </div>
  );
}

export default DriveDetails;
