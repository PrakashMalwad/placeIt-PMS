import { useState, useEffect } from 'react';
import Navbar from '../components/navbar'; 
import TermsModal from '../components/studentterm';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

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
        const response = await fetch(`${apiUrl}/colleges/get-colleges`);
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
      const response = await fetch(`${apiUrl}/auth/register`, {
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
              <InputField label="First Name" id="fname" name="fname" value={formData.fname} onChange={handleChange} />
              <InputField label="Last Name" id="lname" name="lname" value={formData.lname} onChange={handleChange} />
              <InputField label="Email" id="email" name="email" value={formData.email} onChange={handleChange} type="email" />
              <TextAreaField label="About Me" id="aboutme" name="aboutme" value={formData.aboutme} onChange={handleChange} />
              <InputField label="Date of Birth" id="dob" name="dob" value={formData.dob} onChange={handleDateChange} type="date" />
              <InputField label="Age" id="age" name="age" value={formData.age} onChange={handleChange} readOnly />
              <SelectField label="College" id="college" name="college" value={formData.college} onChange={handleChange} options={colleges} />
              <InputField label="Passing Year" id="passingyear" name="passingyear" value={formData.passingyear} onChange={handleChange} />
              <InputField label="Qualification" id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
              <InputField label="Stream" id="stream" name="stream" value={formData.stream} onChange={handleChange} />
            </div>

            <div className="space-y-4">
              <PasswordField label="Password" id="password" name="password" value={formData.password} onChange={handleChange} passwordError={passwordError} />
              <PasswordField label="Confirm Password" id="cpassword" name="cpassword" value={formData.cpassword} onChange={handleChange} passwordError={passwordError} />
              <InputField label="Contact Number" id="contactno" name="contactno" value={formData.contactno} onChange={handleChange} />
              <TextAreaField label="Address" id="address" name="address" value={formData.address} onChange={handleChange} />
              <InputField label="City" id="city" name="city" value={formData.city} onChange={handleChange} />
              <InputField label="State" id="state" name="state" value={formData.state} onChange={handleChange} />
              <TextAreaField label="Skills" id="skills" name="skills" value={formData.skills} onChange={handleChange} />
              <InputField label="Designation" id="designation" name="designation" value={formData.designation} onChange={handleChange} />
              <FileField label="Resume" id="resume" name="resume" onChange={handleFileChange} />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              required
            />
            <label htmlFor="termsAccepted" className="ml-2 text-gray-700">
              I accept the <span className="underline cursor-pointer" onClick={openTermsModal}>Terms & Conditions</span>
            </label>
          </div>

          {loading ? <p>Loading...</p> : <button type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">Register</button>}
        </form>

        {/* Modal for Terms and Conditions */}
        {isTermsModalOpen && <TermsModal onClose={closeTermsModal} />}
      </div>
    </>
  );
};

// Input field component
const InputField = ({ label, id, name, value, onChange, type = "text", readOnly = false }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
      readOnly={readOnly}
      required
    />
  </div>
);

// TextArea field component
const TextAreaField = ({ label, id, name, value, onChange }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
      rows={3}
      required
    />
  </div>
);

// Select field component
const SelectField = ({ label, id, name, value, onChange, options = [] }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300"
      required
    >
      <option value="">Select...</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  </div>
);

// Password field component
const PasswordField = ({ label, id, name, value, onChange, passwordError }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
    <input
      type="password"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ${passwordError ? 'border-red-500' : ''}`}
      required
    />
    {passwordError && <p className="text-red-500 text-xs italic">Passwords do not match</p>}
  </div>
);

// File field component
const FileField = ({ label, id, name, onChange }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}</label>
    <input
      type="file"
      id={id}
      name={name}
      onChange={onChange}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      required
    />
  </div>
);

export default StudentRegisterPage;
