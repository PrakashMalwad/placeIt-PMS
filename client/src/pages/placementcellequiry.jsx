import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

const PlacementCellEnquiryForm = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    collegeName: '',
    enquiryType: 'college', 
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/enquiries/placement-enquiries`, formData);
      console.log('Enquiry submitted:', response.data);
      setSuccess(true);

      // Reset form after a brief delay
      setTimeout(() => {
        setFormData({
          contactName: '',
          email: '',
          phone: '',
          collegeName: '',
          enquiryType: 'college', // Reset to default value
          message: '',
        });
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setError('Error submitting your enquiry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Placement Cell Enquiry Form</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Enquiry submitted successfully!</p>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contactName">Name</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="collegeName">College Name</label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <input type="hidden" name="enquiryType" value={formData.enquiryType} /> {/* Hidden input for enquiryType */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
      </div>
    </>
  );
};

export default PlacementCellEnquiryForm;
