import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShowDrive() {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false); // New state to trigger search

  // Fetching job drives from the backend
  const fetchDrives = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/drives', {
        params: { page, limit: 10, search }
      });

      console.log('API Response:', response.data);
      setDrives(response.data.drives || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching drives:', err.response || err);
      setError('Failed to fetch job drives. Please try again later.');
      setDrives([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchDrives();
  }, [fetchDrives]);

  // Handling search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update search value
    setPage(1); // Reset to the first page
    setTriggerSearch(true); // Mark that search should be triggered
  };

  // Fetch drives only when search is triggered or page changes
  useEffect(() => {
    if (triggerSearch) {
      fetchDrives();
      setTriggerSearch(false); // Reset trigger
    }
  }, [fetchDrives, triggerSearch]); // Only trigger fetch when `triggerSearch` changes

  // Handling pagination change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Active Job Drives</h2>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-center mb-8 items-center">
        <input
          type="text"
          className="border border-gray-300 rounded-l-md py-3 px-6 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Search job drives..."
          value={search}
          onChange={handleSearchChange} // On input change, search is updated
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md mt-3 md:mt-0 md:ml-1 hover:bg-blue-700 transition duration-200 focus:outline-none"
          onClick={fetchDrives} // Fetch results when clicking the button
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && <div className="animate-spin text-center text-gray-500">Loading...</div>}

      {/* Error Message */}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Job Drives Cards */}
      {!loading && !error && drives.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {drives.map((drive) => (
            <div
              key={drive._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{drive.company}</h3>
              <p className="text-gray-500 mb-1">{new Date(drive.date).toLocaleDateString()}</p>
              <p className="text-gray-500 mb-1">{drive.location}</p>
              <p className="text-gray-500 mb-2">{drive.eligibilityCriteria}</p>
              <p className="text-red-500 font-semibold">
                Deadline: {new Date(drive.applicationDeadline).toLocaleDateString()}
              </p>
              <Link
                to={`drive/${drive._id}`}
                className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* No Job Drives Found */}
      {!loading && !error && drives.length === 0 && (
        <div className="text-center text-gray-500">No job drives found.</div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          className={`px-6 py-2 rounded-lg font-semibold ${page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span className="px-6 py-2 rounded-lg border bg-white shadow-md">Page {page} of {totalPages}</span>
        <button
          className={`px-6 py-2 rounded-lg font-semibold ${page === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ShowDrive;
