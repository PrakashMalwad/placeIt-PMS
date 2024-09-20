import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [withdrawing, setWithdrawing] = useState(null); // Track the withdrawing status

  // Fetch student ID from local storage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const studentId = user ? user.id : null;

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/api/applications/student/${studentId}`);
        setApplications(response.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to fetch applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchApplications();
    }
  }, [studentId]);

  const handleWithdraw = async (applicationId) => {
    setWithdrawing(applicationId); // Indicate the app is in the withdrawing process
    setError(null); // Reset error before making the request
    try {
      await axios.put(`${apiUrl}/api/applications/${applicationId}`, { status: 'Withdrawn' });
      setApplications(applications.map(app =>
        app._id === applicationId ? { ...app, status: 'Withdrawn' } : app
      ));
    } catch (err) {
      console.error('Error withdrawing application:', err);
      setError('Failed to withdraw application. Please try again later.');
    } finally {
      setWithdrawing(null); // Reset the withdrawing status after the request
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Filter out withdrawn applications
  const filteredApplications = applications.filter(app => app.status !== 'Withdrawn');

  if (filteredApplications.length === 0) return <div className="text-center text-gray-500">No applications found.</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">My Job Applications</h2>
      <div className="grid grid-cols-1 gap-6">
        {filteredApplications.map((application) => (
          <div
            key={application._id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Application ID: {(application._id)}</h3>
            <p><strong>Company Name:</strong> {application.drive.company || 'N/A'}</p>
            <p><strong>Status:</strong> {application.status}</p>
            <p><strong>Applied Date:</strong> {new Date(application.appliedDate).toLocaleDateString()}</p>
            
            {application.status !== 'Withdrawn' && (
              <button
                onClick={() => handleWithdraw(application._id)}
                className={`mt-4 block text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 ${
                  withdrawing === application._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={withdrawing === application._id}
              >
                {withdrawing === application._id ? 'Withdrawing...' : 'Withdraw Application'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;
