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
    setSearch(e.target.value);
    setPage(1); // Reset to the first page when searching
  };

  // Handling pagination change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center my-4 text-gray-800">Active Job Drives</h2>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-center mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded-l-md py-2 px-4 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search job drives"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md mt-2 md:mt-0 md:ml-2 hover:bg-blue-600 focus:outline-none"
          onClick={fetchDrives}
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center text-gray-500">Loading...</div>}

      {/* Error Message */}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Job Drives Cards */}
      {!loading && !error && drives.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {drives.map((drive) => (
            <div key={drive._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">{drive.company}</h3>
              <p className="text-gray-600">{new Date(drive.date).toLocaleDateString()}</p>
              <p className="text-gray-600">{drive.location}</p>
              <p className="text-gray-600">{drive.eligibilityCriteria}</p>
              <p className="text-gray-600">Deadline: {new Date(drive.applicationDeadline).toLocaleDateString()}</p>
              <Link
                to={`drive/${drive._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 inline-block text-center hover:bg-blue-600 focus:outline-none"
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
      <div className="flex flex-col md:flex-row justify-center mt-6 space-y-2 md:space-y-0 md:space-x-4">
        <button
          className={`px-4 py-2 rounded-md border ${page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2 rounded-md border bg-white shadow-md">Page {page} of {totalPages}</span>
        <button
          className={`px-4 py-2 rounded-md border ${page === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
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
