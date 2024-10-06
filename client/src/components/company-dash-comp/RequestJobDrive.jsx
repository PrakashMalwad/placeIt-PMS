import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../GeneralModal"; // Import your modal component

const RequestDrive = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [colleges, setColleges] = useState([]);
  const [collegeStats, setCollegeStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    requirements: "",
    applicationDeadline: "",
    salary: "",
    college: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust this value as needed
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Colleges
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/colleges`);
      setColleges(response.data);
    } catch (error) {
      setError(`Error fetching colleges: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch College Stats
  const fetchCollegeStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/statistics/`);
      setCollegeStats(response.data);

      // Fetch additional stats for each college
      collegeStats.map((stat) =>
        axios.get(`${apiUrl}/api/stats/${stat.collegeId._id}`)
      );
    } catch (error) {
      setError(`Error fetching college stats: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
    fetchCollegeStats();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/reqDrive/`, { ...formData });
      alert("Job drive requested successfully!");
      // Reset form
      setFormData({
        jobTitle: "",
        jobDescription: "",
        requirements: "",
        applicationDeadline: "",
        salary: "",
        college: "",
      });
      setIsModalOpen(false); // Close modal after submission
    } catch (error) {
      console.error(
        "Error requesting job drive:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "There was an issue requesting the job drive. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Pagination Logic
  const indexOfLastCollege = currentPage * itemsPerPage;
  const indexOfFirstCollege = indexOfLastCollege - itemsPerPage;
  const currentColleges = collegeStats.slice(
    indexOfFirstCollege,
    indexOfLastCollege
  );

  const totalPages = Math.ceil(collegeStats.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Colleges&apos; Placement Statistics
      </h2>

      {/* Request Job Drive Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Request Job Drive
        </button>
      </div>

      {loading && <p>Loading data...</p>}

      {!loading && (
        <>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2">College Name</th>
                <th className="border border-gray-200 p-2">Total Students</th>
                <th className="border border-gray-200 p-2">
                  Total Eligible Students
                </th>
                <th className="border border-gray-200 p-2">
                  Total Placed Students
                </th>
                <th className="border border-gray-200 p-2">
                  Total Drives Conducted
                </th>
              </tr>
            </thead>
            <tbody>
              {currentColleges.map((stat) => (
                <tr key={stat._id}>
                  <td className="border border-gray-200 p-2">
                    {stat.collegeId?.name || "N/A"}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {stat.totalStudents || 0}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {stat.totalEligibleStudents || 0}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {stat.totalPlacedStudents || 0}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {stat.totalDrives || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center my-4">
            <div>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-300 p-2 rounded-md mx-1"
              >
                Previous
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-300 p-2 rounded-md mx-1"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal for Requesting Job Drive */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-6">Request a Job Drive</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="jobTitle"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="jobDescription"
              >
                Job Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="requirements"
              >
                Requirements
              </label>
              <input
                type="text"
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="applicationDeadline"
              >
                Application Deadline
              </label>
              <input
                type="date"
                id="applicationDeadline"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="college"
              >
                College
              </label>
              {error && <p className="text-red-500">{error}</p>}
              <select
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a College</option>
                {colleges.map((college) => (
                  <option key={college._id} value={college._id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Requesting..." : "Submit Request"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RequestDrive;
