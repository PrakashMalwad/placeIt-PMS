import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Optional for notifications

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ManageJobDrives() {
  const [drives, setDrives] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    company: '',
    date: '',
    location: '',
    eligibilityCriteria: '',
    jobDescription: '',
    applicationDeadline: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    postedBy: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch job drives
  const fetchDrives = async () => {
    setLoading(true); // Start loading
    try {
      const currentUser = sessionStorage.getItem('user');
      const userId = JSON.parse(currentUser).id;
      const response = await axios.get(`${apiUrl}/api/drives/byuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        params: { page, search },
      });

      setDrives(response.data.drives);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching drives:', error);
      toast.error('Error fetching drives');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 when searching
    fetchDrives();
  };

  // Add or Edit Drive
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!form.company || !form.date || !form.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const currentUser = JSON.parse(sessionStorage.getItem('user'));
      const updatedForm = { ...form, postedBy: currentUser };

      if (isEditing) {
        await axios.put(`${apiUrl}/api/drives/${editingId}`, updatedForm);
        toast.success('Drive updated successfully');
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(`${apiUrl}/api/drives`, updatedForm);
        toast.success('Drive added successfully');
      }

      fetchDrives();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting the drive');
    }
  };

  // Delete a drive
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this drive?')) {
      try {
        await axios.delete(`${apiUrl}/api/drives/${id}`);
        fetchDrives();
        toast.success('Drive deleted successfully');
      } catch (error) {
        console.error('Error deleting drive:', error);
        toast.error('Error deleting the drive');
      }
    }
  };

  // Edit a drive
  const handleEdit = (drive) => {
    setIsEditing(true);
    setEditingId(drive._id);
    setForm({
      ...drive,
      date: new Date(drive.date).toISOString().split('T')[0],
      applicationDeadline: new Date(drive.applicationDeadline).toISOString().split('T')[0],
    });
  };

  const resetForm = () => {
    setForm({
      company: '',
      date: '',
      location: '',
      eligibilityCriteria: '',
      jobDescription: '',
      applicationDeadline: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      postedBy: '',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  useEffect(() => {
    fetchDrives();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Job Drives</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search by company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </form>

      {/* Loading Indicator */}
      {loading ? <div className="mb-4">Loading...</div> : null}

      {/* Job Drives List */}
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Posted By</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((drive) => (
            <tr key={drive._id}>
              <td className="border px-4 py-2">{drive.company}</td>
              <td className="border px-4 py-2">{new Date(drive.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{drive.location}</td>
              <td className="border px-4 py-2">{drive.postedBy?.name || 'N/A'}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(drive)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(drive._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                <Link
                  to={`applications/${drive._id}`}
                  className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  View Applications
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mb-4">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>

      {/* Add/Edit Job Drive Form */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Job Drive' : 'Add New Job Drive'}</h2>

        <input
          type="text"
          placeholder="Company"
          value={form.company}
          required
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="date"
          value={form.date}
          required

          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          required

          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Eligibility Criteria"
          value={form.eligibilityCriteria}
          required

          onChange={(e) => setForm({ ...form, eligibilityCriteria: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <textarea
          placeholder="Job Description"
          value={form.jobDescription}
          required

          onChange={(e) => setForm({ ...form, jobDescription: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        ></textarea>

        <input
          type="date"
          value={form.applicationDeadline}
          required

          onChange={(e) => setForm({ ...form, applicationDeadline: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Contact Person"
          value={form.contactPerson}
          required
          onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="email"
          placeholder="Contact Email"
          value={form.contactEmail}
          required

          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Contact Phone"
          value={form.contactPhone}
          required

          onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
          className="border rounded p-2 mb-4 w-full"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{isEditing ? 'Update Drive' : 'Add Drive'}</button>
      </form>
    </div>
  );
}

export default ManageJobDrives;
