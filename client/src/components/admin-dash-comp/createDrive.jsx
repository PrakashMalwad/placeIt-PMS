import { useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const CreateDrive = () => {
  const [formData, setFormData] = useState({
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

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // Basic validation
    for (const key in formData) {
      if (formData[key].trim() === '') {
        return `Please fill in the ${key} field.`;
      }
    }

    // Date validation
    const today = new Date().toISOString().split('T')[0];
    if (formData.date < today) {
      return 'The date must be today or a future date.';
    }
    if (formData.applicationDeadline < today) {
      return 'The application deadline must be today or a future date.';
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contactPhone)) {
      return 'Please enter a valid 10-digit phone number.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/drives`, formData);
      if (response.status === 201) {
        setSuccess('Job drive created successfully');
        setFormData({
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
      } else {
        setError('Failed to create job drive, please try again.');
      }
    } catch (err) {
      setError(err || 'Failed to create job drive');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Create a Job Drive</h2>

      {success && <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg">{success}</div>}
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: 'Company', name: 'company', type: 'text' },
          { label: 'Date', name: 'date', type: 'date' },
          { label: 'Location', name: 'location', type: 'text' },
          { label: 'Eligibility Criteria', name: 'eligibilityCriteria', type: 'text' },
          { label: 'Job Description', name: 'jobDescription', type: 'textarea' },
          { label: 'Application Deadline', name: 'applicationDeadline', type: 'date' },
          { label: 'Contact Person', name: 'contactPerson', type: 'text' },
          { label: 'Contact Email', name: 'contactEmail', type: 'email' },
          { label: 'Contact Phone', name: 'contactPhone', type: 'text', pattern: '\\d{10}', title: 'Please enter a valid 10-digit phone number' }
        ].map((field, index) => (
          <div className="form-group" key={index}>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={field.name}>
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                pattern={field.pattern}
                title={field.title}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {(field.name === 'date' || field.name === 'applicationDeadline') && (
              <p className="text-gray-500 text-xs mt-1">Please select a future date.</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Drive
        </button>
      </form>
    </div>
  );
};

export default CreateDrive;
