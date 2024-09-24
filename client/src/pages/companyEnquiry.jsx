import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

const CompanyEnquiryForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
    enquiryType: 'company', // Default value for enquiry type
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/enquiries/company-enquiries`, formData);
      console.log('Enquiry submitted:', response.data);
      setSuccess(true);

      // Reset form after submission
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        message: '',
        enquiryType: 'company', // Reset to default
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  const handleBackHome = () => {
    navigate('/'); // Adjust the path according to your routing setup
  };

  if (success) {
    return (
      <>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Thank You!</h2>
        <p className="text-center mb-4">We will contact you soon.</p>
        <button
          onClick={handleBackHome}
          className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200"
        >
          Back to Home
        </button>
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Company Enquiry Form</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="contactName">Contact Person Name</label>
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
        <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200">
          Submit Enquiry
        </button>
      </form>
    </div>
    </>
  );
};

export default CompanyEnquiryForm;
