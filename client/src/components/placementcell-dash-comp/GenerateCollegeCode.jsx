import { useState, useEffect } from 'react';
import axios from 'axios';

const CollegeCodeManager = () => {
  const [collegeCode, setCollegeCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const apiUrl = import.meta.env.VITE_BACKEND_URL; // Replace with your actual API URL

  // Function to fetch the college code on component mount
  useEffect(() => {
    const fetchCollegeCode = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/college-code/get`); // Fetch existing college code
        setCollegeCode(response.data.code);
      } catch (err) {
        console.error('Error fetching college code:', err);
        setError('Failed to fetch college code.');
      }
    };

    fetchCollegeCode();
  }, [apiUrl]);

  // Function to handle code generation
  const handleGenerateCode = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${apiUrl}/api/college-code/generate-college-code`); // Generate a new college code
      setCollegeCode(response.data.code);
    } catch (err) {
      console.error('Error generating college code:', err);
      setError('Failed to generate college code.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle code deletion
  const handleDeleteCode = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.delete(`${apiUrl}/api/college-code/delete-college-code`); // Delete the existing college code
      setCollegeCode(''); // Clear the college code after deletion
    } catch (err) {
      console.error('Error deleting college code:', err);
      setError('Failed to delete college code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage College Code</h2>
      {collegeCode ? (
        <div className="mt-6 p-4 border border-green-500 bg-green-100 rounded-md">
          <p className="text-xl font-medium">Current College Code: {collegeCode}</p>
          <button
            onClick={handleDeleteCode}
            disabled={loading}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 mt-4"
          >
            {loading ? 'Deleting...' : 'Delete Code'}
          </button>
        </div>
      ) : (
        <p>No college code generated yet.</p>
      )}
      <button
        onClick={handleGenerateCode}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mt-4"
      >
        {loading ? 'Generating...' : 'Generate College Code'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CollegeCodeManager;
