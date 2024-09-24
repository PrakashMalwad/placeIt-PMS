import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState({
    company: [],
    college: [],
    general: [],
  });
  const [activeTab, setActiveTab] = useState('company'); // Default active tab

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default header for all Axios requests
    }
  }, []);
  // Fetch all enquiries from the backend
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/enquiries`);
        const groupedEnquiries = {
          company: response.data.filter((enquiry) => enquiry.enquiryType === 'company'),
          college: response.data.filter((enquiry) => enquiry.enquiryType === 'college'),
          general: response.data.filter((enquiry) => enquiry.enquiryType === 'general'),
        };
        setEnquiries(groupedEnquiries);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      }
    };

    fetchEnquiries();
  }, []);

  // Render the cards for each enquiry
  const renderCards = (enquiryList) => (
    <>
      {enquiryList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enquiryList.map((enquiry) => (
            <div key={enquiry._id} className="border border-gray-300 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                {enquiry.companyName || enquiry.collegeName || 'N/A'}
              </h3>
              <p><strong>Contact Name:</strong> {enquiry.contactName}</p>
              <p><strong>Email:</strong> {enquiry.email}</p>
              <p><strong>Phone:</strong> {enquiry.phone}</p>
              <p className="mt-2"><strong>Message:</strong> {enquiry.message}</p>
              <p className="text-sm text-gray-500 mt-4">{new Date(enquiry.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No enquiries available.</p>
      )}
    </>
  );

  // Tab Content Mapping
  const tabContent = {
    company: renderCards(enquiries.company),
    college: renderCards(enquiries.college),
    general: renderCards(enquiries.general),
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">All Enquiries</h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 rounded-lg ${activeTab === 'company' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('company')}
        >
          Company Enquiries
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg ${activeTab === 'college' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('college')}
        >
          College Enquiries
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg ${activeTab === 'general' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('general')}
        >
          General Enquiries
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default AdminEnquiries;
