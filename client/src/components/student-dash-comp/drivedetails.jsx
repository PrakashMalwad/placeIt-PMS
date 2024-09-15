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
  const [successMessage, setSuccessMessage] = useState(null);

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

    fetchDriveDetails();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.id) {
        throw new Error('You need to be logged in to apply.');
      }

      const application = {
        student: user.id,
        drive: id,
        appliedDate: new Date().toISOString(),
        studentResume: '', // This should be updated based on your requirements
      };

      await axios.post(`${apiUrl}/api/applications`, application);
      setSuccessMessage('Applied successfully!');
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
      <h2 className="text-2xl font-bold text-center my-4 text-gray-800">{drive.company}</h2>
      <p><strong>Date:</strong> {new Date(drive.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {drive.location}</p>
      <p><strong>Eligibility Criteria:</strong> {drive.eligibilityCriteria}</p>
      <p><strong>Application Deadline:</strong> {new Date(drive.applicationDeadline).toLocaleDateString()}</p>
      <p><strong>Contact Person:</strong> {drive.contactPerson}</p>

      {successMessage && <div className="text-center text-green-500 mt-4">{successMessage}</div>}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none ${
          applying ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleApply}
        disabled={applying}
      >
        {applying ? 'Applying...' : 'Apply'}
      </button>
    </div>
  );
}

export default DriveDetails;
