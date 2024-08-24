import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Adjust path if needed
import TermsModal from '../components/studentterm';
const StudentRegisterPage = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    aboutme: '',
    dob: '',
    age: '',
    college: '',
    passingyear: '',
    qualification: '',
    stream: '',
    password: '',
    cpassword: '',
    contactno: '',
    address: '',
    city: '',
    state: '',
    skills: '',
    designation: '',
    resume: null,
    termsAccepted: false
  });
  const [passwordError, setPasswordError] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Handle modal open/close
  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('http://localhost:5000/colleges/get-colleges');
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({ ...prevData, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.cpassword) {
      setPasswordError(true);
      setLoading(false);
      return;
    }

    setPasswordError(false);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        alert('Registration successful');
        setFormData({
          fname: '',
          lname: '',
          email: '',
          aboutme: '',
          dob: '',
          age: '',
          college: '',
          passingyear: '',
          qualification: '',
          stream: '',
          password: '',
          cpassword: '',
          contactno: '',
          address: '',
          city: '',
          state: '',
          skills: '',
          designation: '',
          resume: null,
          termsAccepted: false
        });
      } else {
        alert(`Registration failed: ${result.msg}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const today = new Date();
    const birthDate = new Date(e.target.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    setFormData(prevData => ({
      ...prevData,
      dob: e.target.value,
      age: m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 lg:p-12">
        <h3 className="text-center text-3xl font-semibold mb-8">Create Your Profile</h3>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-200 p-8 rounded-lg shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* About Me */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aboutme">About Me</label>
                <textarea
                  id="aboutme"
                  name="aboutme"
                  value={formData.aboutme}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  rows="4"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleDateChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  readOnly
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="college">College</label>
                <select
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                >
                  <option value="">Select a college</option>
                  {colleges.map(college => (
                    <option key={college._id} value={college.id}>{college.name}</option>
                  ))}
                </select>
              </div>

              {/* Passing Year */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passingyear">Passing Year</label>
                <input
                  type="text"
                  id="passingyear"
                  name="passingyear"
                  value={formData.passingyear}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qualification">Qualification</label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* Stream */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stream">Stream</label>
                <input
                  type="text"
                  id="stream"
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ${passwordError ? 'border-red-500' : ''}`}
                  required
                />
                {passwordError && <p className="text-red-500 text-xs italic">Passwords do not match.</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ${passwordError ? 'border-red-500' : ''}`}
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactno">Contact Number</label>
                <input
                  type="text"
                  id="contactno"
                  name="contactno"
                  value={formData.contactno}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  rows="3"
                  required
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">Skills</label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  rows="4"
                  required
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">Designation</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume">Resume</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={() => setFormData(prevData => ({ ...prevData, termsAccepted: !prevData.termsAccepted }))}
              className="mr-2 leading-tight"
              required
            />
            <label htmlFor="termsAccepted" className="text-sm">
              I accept the{' '}
              <span
                onClick={openTermsModal}
                className="text-blue-500 cursor-pointer underline"
              >
                terms and conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
      <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />

    </>
  );
};

export default StudentRegisterPage;
