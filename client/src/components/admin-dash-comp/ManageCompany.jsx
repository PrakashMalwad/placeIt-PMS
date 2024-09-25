import { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    companyname: '',
    contactno: '',
    website: '',
    logo: '',
    type: '',
    state: '',
    city: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/companies`);
      setCompanies(response.data);
    } catch (error) {
      setError('Error fetching companies', error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/companies/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/companies`, formData);
      }
      fetchCompanies();
      resetForm();
    } catch (error) {
      setError('Error submitting the form', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (company) => {
    setFormData(company);
    setEditingId(company._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/companies/${id}`);
        fetchCompanies();
      } catch (error) {
        setError('Error deleting the company', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      companyname: '',
      contactno: '',
      website: '',
      logo: '',
      type: '',
      state: '',
      city: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h3 className="text-2xl font-bold mb-4 text-center">Company List</h3>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {/* Company List */}
      <ul className="space-y-4">
        {companies.map((company) => (
          <li key={company._id} className="bg-white shadow-md p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-grow">
              <h4 className="font-bold text-lg text-gray-700">{company.companyname}</h4>
              <p className="text-gray-500">{company.city}, {company.state}</p>
              <p className="text-gray-600">{company.contactno}</p>
            </div>
            <div className="flex space-x-3 mt-3 md:mt-0">
              <button onClick={() => handleEdit(company)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(company._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Manage Company Form */}
      <h2 className="text-2xl pt-8 font-bold text-center mb-6">Manage Company</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="companyname">Company Name</label>
            <input
              type="text"
              id="companyname"
              name="companyname"
              value={formData.companyname}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="contactno">Contact Number</label>
            <input
              type="tel"
              id="contactno"
              name="contactno"
              value={formData.contactno}
              onChange={handleChange}
              required
              pattern="^\+?[1-9]\d{1,14}$"
              title="Please enter a valid contact number"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="logo">Logo URL</label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Type</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Startup">Startup</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            {editingId ? 'Update Company' : 'Add Company'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyManagement;
