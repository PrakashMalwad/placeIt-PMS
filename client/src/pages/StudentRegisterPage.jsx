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
    role: "student",
    college: "",
    collegeCode: "",
  });

  const [colleges, setColleges] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch college list from API
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

  // Handle input changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    // Final validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        college: formData.college,
        collegeCode: formData.collegeCode,
        role: formData.role,
      };
      console.log("Registration Data: ", registrationData);

      const response = await axios.post(
        `${apiUrl}/api/home/register-student`,
        registrationData
      );

      setSuccessMessage("Registration successful! You can now log in.");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
      
      // Reset form data only on successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
        college: "",
        collegeCode: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred while registering"
      );
    } finally {
      setIsLoading(false); // Stop loading
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
            {/* Name Input */}
            <div>
              <label className="block text-gray-700" htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name" // Added id for accessibility
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700" htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email" // Added id for accessibility
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* College Dropdown */}
            <div>
              <label className="block text-gray-700" htmlFor="college">College:</label>
              <select
                name="college"
                id="college" // Added id for accessibility
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select your college</option>
                {colleges.map((college) => (
                  <option key={college._id} value={college._id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>

            {/* College Code Input */}
            <div>
              <label className="block text-gray-700" htmlFor="collegeCode">College Code:</label>
              <input
                type="text"
                name="collegeCode"
                id="collegeCode" // Added id for accessibility
                value={formData.collegeCode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700" htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password" // Added id for accessibility
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-700" htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword" // Added id for accessibility
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentRegisterPage;
