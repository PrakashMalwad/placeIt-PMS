import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const StudentRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
  });

  const [colleges, setColleges] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/home/colleges`);
        const data = await response.json();
        setColleges(data.colleges);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Real-time validation for password matching
    if (name === "password" || name === "confirmPassword") {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match");
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    setErrorMessage("");
    setSuccessMessage("");

    // Logic to submit registration data
    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        college: formData.college,
      };

      const response = await axios.post(
        `${apiUrl}/api/auth/register`,
        registrationData
      );

      if (response) {
        setSuccessMessage("Registration successful! You can now log in.");
      }

      // Optionally reset form data
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        college: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message || "An error occurred while registering"
        );
      } else {
        setErrorMessage("An error occurred while registering");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Student Registration
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">College:</label>
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select your college</option>
                {colleges.map((college) => (
                  <option key={college.id} value={college.name}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentRegisterPage;
