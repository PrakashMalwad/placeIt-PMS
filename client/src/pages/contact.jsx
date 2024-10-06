import  { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    collegeName: '',
    enquiryType: 'General',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await axios.post(
        `${apiUrl}/api/enquiries/general-enquiries`, 
        formData
      );
      if (response.status !== 201) {
        throw new Error('Failed to submit enquiry');
      }
      setSuccessMessage('Your enquiry has been submitted successfully!');
      setErrorMessage('');
      setFormData({
        companyName: '',
        collegeName: '',
        enquiryType: 'General',
        contactName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setErrorMessage('There was an error submitting your enquiry. Please try again.',error);
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enquiry Type</label>
            <select
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="General">General</option>
              <option value="College">College</option>
              <option value="Company">Company</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Job Posting">Job Posting</option>
              <option value="Connect">Connect</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Enquiry
          </button>
        </form>

        {/* Contact Details Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
          <p className="text-gray-700">📞 Phone: <a href="tel:+1234567890" className="text-blue-600">+1 (234) 567-890</a></p>
          <p className="text-gray-700">📧 Email: <a href="mailto:sies.cs@gmail.com" className="text-blue-600">sies.cs@gmail.com</a></p>
          <p className="text-gray-700">🏢 Address: 123 Your Street, Your City, Your Country</p>
          <p className="text-gray-700">🌐 Website: <a href="https://placeit-pms.pages.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600">www.placeit-pms.com</a></p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
