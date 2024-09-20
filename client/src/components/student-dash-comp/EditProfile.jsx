// src/components/EditProfile.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    aboutMe: '',
    dob: '',
    college: '',
    passingYear: '',
    qualification: '',
    stream: '',
    contactNo: '',
    address: '',
    city: '',
    state: '',
    skills: '',
    designation: '',
    resume: null,
    profileImage: null,
    termsAccepted: false,
  });

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch current user data and colleges on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, collegesRes] = await Promise.all([
          axios.get('/api/users/id'),  // Use api
          axios.get('/api/colleges'),
        ]);

        const user = userRes.data;
        setFormData({
          aboutMe: user.aboutMe || '',
          dob: user.dob ? user.dob.substring(0, 10) : '', // Format as YYYY-MM-DD
          college: user.college || '',
          passingYear: user.passingYear || '',
          qualification: user.qualification || '',
          stream: user.stream || '',
          contactNo: user.contactNo || '',
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          skills: user.skills ? user.skills.join(', ') : '',
          designation: user.designation || '',
          resume: null, // File inputs are handled separately
          profileImage: null,
          termsAccepted: user.termsAccepted || false,
        });

        setColleges(collegesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};

    if (!formData.college) newErrors.college = 'College is required.';
    if (!formData.contactNo) newErrors.contactNo = 'Contact number is required.';
    // Additional validations
    if (!formData.aboutMe) newErrors.aboutMe = 'About me section is required.';
    if (!formData.dob) newErrors.dob = 'Date of birth is required.';
    if (!formData.skills) newErrors.skills = 'Skills are required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const updateData = new FormData();

      // Append form fields
      for (const key in formData) {
        if (formData[key] !== null) {
          if (key === 'skills') {
            updateData.append(key, formData[key].split(',').map(skill => skill.trim()));
          } else if (key === 'profileImage' || key === 'resume') {
            // Append files only if they are uploaded
            if (formData[key]) updateData.append(key, formData[key]);
          } else {
            updateData.append(key, formData[key]);
          }
        }
      }

      // Send PUT request to update profile
      const response = await axios.put('/api/users/id', updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'An error occurred while updating your profile.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {errors.general && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Form fields (omitted for brevity) */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={submitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
              submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {submitting ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
