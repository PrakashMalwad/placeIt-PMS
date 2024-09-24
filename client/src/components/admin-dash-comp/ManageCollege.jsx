import { useState, useEffect } from 'react';
import axios from 'axios';

const CollegeManagement = () => {
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    website: '',
    logo: '',
    type: '',
    university: '',
    state: '',
    city: '',
    pincode: '',
    establishmentYear: '',
    affiliation: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/colleges`);
      setColleges(response.data);
    } catch (error) {
      setError('Error fetching colleges',error);
    }
  };
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default header for all Axios requests
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
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/colleges/${editingId}`, formData);
        setEditingId(null); // Reset editing state
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/colleges`, formData);
      }
      fetchColleges(); // Refresh the college list
      resetForm();
    } catch (error) {
      setError('Error submitting the form',error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (college) => {
    setFormData(college);
    setEditingId(college._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/colleges/${id}`);
        fetchColleges(); // Refresh the college list
      } catch (error) {
        setError('Error deleting the college',error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      contactNumber: '',
      website: '',
      logo: '',
      type: '',
      university: '',
      state: '',
      city: '',
      pincode: '',
      establishmentYear: '',
      affiliation: '',
    });
  };

  return (
    <div className="container mx-auto px-2 py-12">
     
      <h3 className="text-2xl font-bold mb-4">Colleges List</h3>
      <ul className="space-y-4">
        {colleges.map((college) => (
          <li key={college._id} className="bg-gray-100 p-4 rounded-lg flex justify-between">
            <div>
              <h4 className="font-bold">{college.name}</h4>
              <p>{college.address}</p>
              <p>{college.contactNumber}</p>
              {/* Add any other fields you want to display */}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(college)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(college._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-3xl pt-6 font-bold text-center mb-6"> Manage College</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg md:p-4 ">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
              
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="logo">Logo URL</label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Select Type</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Community">Community</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="university">University</label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
              pattern="[0-9]{6}" // Basic validation for a 6-digit pincode
              title="Please enter a valid 6-digit pincode"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="establishmentYear">Establishment Year</label>
            <input
              type="number"
              id="establishmentYear"
              name="establishmentYear"
              value={formData.establishmentYear}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
              min="1800" // Reasonable lower bound for establishment year
              max={new Date().getFullYear()} // Current year as upper bound
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="affiliation">Affiliation</label>
            <input
              type="text"
              id="affiliation"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : (editingId ? 'Update College' : 'Add College')}
        </button>
      </form>

      
    </div>
  );
};

export default CollegeManagement;
