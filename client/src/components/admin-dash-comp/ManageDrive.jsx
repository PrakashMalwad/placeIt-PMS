import { useState, useEffect } from 'react';
import axios from 'axios';
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
    contactPhone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch job drives
  const fetchDrives = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/drives?page=${page}&limit=10&search=${search}`);
      setDrives(response.data.drives);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching drives:', error);
    }
  };

  // Search drives
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 when searching
    fetchDrives();
  };

  // Add or Edit Drive
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/api/drives/${editingId}`, form);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(`${apiUrl}/api/drives`, form);
      }
      fetchDrives();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Delete a drive
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/drives/${id}`);
      fetchDrives();
    } catch (error) {
      console.error('Error deleting drive:', error);
    }
  };

  // Edit a drive
  const handleEdit = (drive) => {
    setIsEditing(true);
    setEditingId(drive._id);
    setForm(drive);
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
      contactPhone: ''
    });
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

      {/* Job Drives List */}
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((drive) => (
            <tr key={drive._id}>
              <td className="border px-4 py-2">{drive.company}</td>
              <td className="border px-4 py-2">{new Date(drive.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{drive.location}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(drive)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(drive._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mb-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>

      {/* Add/Edit Job Drive Form */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Job Drive' : 'Add New Job Drive'}</h2>

        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Eligibility Criteria"
          value={form.eligibilityCriteria}
          onChange={(e) => setForm({ ...form, eligibilityCriteria: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <textarea
          placeholder="Job Description"
          value={form.jobDescription}
          onChange={(e) => setForm({ ...form, jobDescription: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        ></textarea>

        <input
          type="date"
          value={form.applicationDeadline}
          onChange={(e) => setForm({ ...form, applicationDeadline: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="email"
          placeholder="Contact Email"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Contact Phone"
          value={form.contactPhone}
          onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
          className="border rounded p-2 mb-4 w-full"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{isEditing ? 'Update Drive' : 'Add Drive'}</button>
      </form>
    </div>
  );
}

export default ManageJobDrives;
