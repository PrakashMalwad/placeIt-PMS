import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Optional for notifications
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa"; // Optional for icons
import Modal from "../GeneralModal";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ManageJobDrives() {
  const [drives, setDrives] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    company: "",
    jobtitle: "",
    date: "",
    location: "",
    eligibilityCriteria: "",
    jobDescription: "",
    applicationDeadline: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    postedBy: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch job drives
  const fetchDrives = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/drives?page=${page}&limit=10&search=${search}`
      );
      setDrives(response.data.drives);
      console.log(response.data)
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching drives:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/companies`);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching drives:", error);
    }
  };
  // Add the Authorization header to axios
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set default header for all Axios requests
    }
    fetchDrives();
    
    fetchCompanies();
  }, []);
  // Handle search
  const handleSearch = (e) => {
  setSearch(e.preventDefault());
    setPage(1); // Reset to page 1 when searching
    fetchDrives();
  };

  // Add or Edit Drive
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!form.company || !form.date || !form.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const currentUser = JSON.parse(sessionStorage.getItem("user")); // Assuming user data is in local storage
      const updatedForm = { ...form, postedBy: currentUser };

      if (isEditing) {
        await axios.put(`${apiUrl}/api/drives/${editingId}`, updatedForm);
        toast.success("Drive updated successfully");
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(`${apiUrl}/api/drives`, updatedForm);
        toast.success("Drive added successfully");
      }

      fetchDrives();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting the drive");
    }
  };

  // Delete a drive
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/drives/${id}`);
      fetchDrives();
      toast.success("Drive deleted successfully");
    } catch (error) {
      console.error("Error deleting drive:", error);
      toast.error("Error deleting the drive");
    }
  };

  // Edit a drive
  const handleEdit = (drive) => {
    setIsEditing(true);
    setEditingId(drive._id);
    setForm(drive);
  };

  const resetForm = () => {
    setForm({
      company: "",
      jobtitle: "",
      date: "",
      location: "",
      eligibilityCriteria: "",
      jobDescription: "",
      applicationDeadline: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      postedBy: {},
    });
  };

  useEffect(() => {
    fetchDrives();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Job Drives</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4 flex flex-row justify-between ">
        <div className="flex">
        <input
          type="text"
          placeholder="Search by company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Search
        </button>
        </div>
     
       <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className=" m-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-3 rounded-lg flex items-center transition-transform transform hover:scale-105 active:scale-95"
      >
          <FaPlus /> Add Drive
      
      </button>
       
      </form>
      

      {/* Job Drives List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Posted By</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => (
              <tr key={drive._id} className="text-center">
                <td className="border px-4 py-2">
                  {drive.company.companyname || "N/A"}
                </td>
                <td className="border px-4 py-2">{drive.jobtitle || "N/A"}</td>
                <td className="border px-4 py-2">
                  {new Date(drive.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{drive.location}</td>
                <td className="border px-4 py-2">
                  {drive.postedBy?.name||'N/A'}
                </td>
                <td className="border px-4 py-2 flex justify-center">
                  <button
                    onClick={() => {
                      setIsModalOpen(true)
                      handleEdit(drive)}}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(drive._id);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mb-4 flex justify-between items-center min-w-full">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Add/Edit Job Drive Form */}
      <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false),setIsEditing(false),resetForm()}}>
        <form
          onSubmit={handleSubmit}
          
        >
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Job Drive" : "Add New Job Drive"}
          </h2>

          <select
            value={form.company}
            required
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="border  rounded p-2 mb-2 w-full"
          >
            <option value="" disabled>
              Select Company
            </option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.companyname}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Job Title"
            value={form.jobtitle}
            required
            onChange={(e) => setForm({ ...form, jobtitle: e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />

          <input
            type="date"
            value={form.date}
            required
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            required
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />

          <input
            type="text"
            placeholder="Eligibility Criteria"
            value={form.eligibilityCriteria}
            required
            onChange={(e) =>
              setForm({ ...form, eligibilityCriteria: e.target.value })
            }
            className="border rounded p-2 mb-2 w-full"
          />

          <textarea
            placeholder="Job Description"
            value={form.jobDescription}
            required
            onChange={(e) =>
              setForm({ ...form, jobDescription: e.target.value })
            }
            className="border rounded p-2 mb-2 w-full"
          ></textarea>

          <input
            type="date"
            value={form.applicationDeadline}
            required
            onChange={(e) =>
              setForm({ ...form, applicationDeadline: e.target.value })
            }
            className="border rounded p-2 mb-2 w-full"
          />

          <input
            type="text"
            placeholder="Contact Person"
            value={form.contactPerson}
            required
            onChange={(e) =>
              setForm({ ...form, contactPerson: e.target.value })
            }
            className="border rounded p-2 mb-2 w-full"
          />

          <input
            type="email"
            placeholder="Contact Email"
            value={form.contactEmail}
            required
            onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />

          <input
            type="text"
            placeholder="Contact Phone"
            value={form.contactPhone}
            required
            onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
            className="border rounded p-2 mb-4 w-full"
          />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update Drive" : "Add Drive"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ManageJobDrives;
