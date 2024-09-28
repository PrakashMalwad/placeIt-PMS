import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DriveContext } from "./DriveContext.jsx";
import Modal from "../GeneralModal.jsx";

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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { selectedDrive } = useContext(DriveContext);
  const [driveid, setSelectedDriveid] = useState("");

  useEffect(() => {
    if (selectedDrive) {
      setIsModalOpen(true);
      setSelectedDriveid(selectedDrive._id);
      setForm({
        company: selectedDrive.company._id,
        jobtitle: selectedDrive.jobTitle || "",
        date: new Date().toISOString().split("T")[0],
        location: selectedDrive.location || "",
        eligibilityCriteria: selectedDrive.requirements || "",
        jobDescription: selectedDrive.jobDescription || "",
        applicationDeadline: new Date(selectedDrive.applicationDeadline)
          .toISOString()
          .split("T")[0],
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
        postedBy: "",
      });
    }
  }, [selectedDrive]);

  const fetchDrives = async () => {
    setLoading(true);
    try {
      const currentUser = sessionStorage.getItem("user");
      const userId = JSON.parse(currentUser).id;
      const response = await axios.get(
        `${apiUrl}/api/drives/byuser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          params: { page, search },
        }
      );

      setDrives(response.data.drives);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching drives:", error);
      toast.error("Error fetching drives");
    } finally {
      setLoading(false);
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
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set default header for all Axios requests
    }
    fetchDrives();
    fetchCompanies();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchDrives();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!form.company || !form.date || !form.location) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (
      form.date &&
      form.applicationDeadline &&
      new Date(form.date) > new Date(form.applicationDeadline)
    ) {
      toast.error("Application deadline must be after the drive date");
      return;
    }

    try {
      const currentUser = JSON.parse(sessionStorage.getItem("user")); // Assuming user data is in session storage
      const updatedForm = { ...form, postedBy: currentUser };

      if (isEditing) {
        // Update existing drive
        await axios.put(`${apiUrl}/api/drives/${editingId}`, updatedForm);
        toast.success("Drive updated successfully");
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new drive
        const response = await axios.post(`${apiUrl}/api/drives`, updatedForm);
        toast.success("Drive added successfully");
        console.log(selectedDrive);
        console.log(response.data + " " + response.data._id);
        if (driveid) {
          if (response.data && response.data._id) {
            await axios.put(`${apiUrl}/api/reqDrive/addDrive`, {
              reqdrive: driveid,
              drive: response.data._id,
            });
          }
        }
      }
      fetchDrives();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Check Form Correctly");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this drive?")) {
      try {
        await axios.delete(`${apiUrl}/api/drives/${id}`);
        fetchDrives();
        toast.success("Drive deleted successfully");
      } catch (error) {
        console.error("Error deleting drive:", error);
        toast.error("Error deleting the drive");
      }
    }
  };

  const handleEdit = (drive) => {
    setIsEditing(true);
    setEditingId(drive._id);
    setForm({
      ...drive,
      date: new Date(drive.date).toISOString().split("T")[0],
      applicationDeadline: new Date(drive.applicationDeadline)
        .toISOString()
        .split("T")[0],
    });
    setIsModalOpen(true); // Open the modal when editing
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
      postedBy: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  useEffect(() => {
    fetchDrives();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Job Drives</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search by company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading ? <div className="mb-4">Loading...</div> : null}

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
            <tr key={drive._id}>
              <td className="border px-4 py-2">{drive.company.companyname}</td>
              <td className="border px-4 py-2">{drive.jobtitle||"N/A"}</td>
              <td className="border px-4 py-2">
                {new Date(drive.date).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{drive.location}</td>
              <td className="border px-4 py-2">
                {drive.postedBy?.name || "N/A"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    handleEdit(drive);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(drive._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <Link
                  to={`applications/${drive._id}`}
                  className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  View Applications
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4">
        <button
          onClick={() => {
            setIsModalOpen(true);
            resetForm();
          }}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Add New Drive
        </button>
      </div>

      {/* Pagination */}
      <div className="mb-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Next
        </button>
      </div>

      {/* Modal for Add/Edit Drive */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Drive" : "Add Drive"}
        </h2>
        <form onSubmit={handleSubmit}>
      

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
          <div>
            <label className="block mb-2">Job Title</label>
            <input
              type="text"
              value={form.jobtitle}
              onChange={(e) => setForm({ ...form, jobtitle: e.target.value })}
              required
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Date</label>
            <input
              type="date"
              value={form.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Eligibility Criteria</label>
            <input
              type="text"
              value={form.eligibilityCriteria}
              onChange={(e) =>
                setForm({ ...form, eligibilityCriteria: e.target.value })
              }
              required
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Job Description</label>
            <textarea
              value={form.jobDescription}
              onChange={(e) =>
                setForm({ ...form, jobDescription: e.target.value })
              }
              required
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Application Deadline</label>
            <input
              type="date"
              value={form.applicationDeadline}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setForm({ ...form, applicationDeadline: e.target.value })
              }
              required
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Contact Person</label>
            <input
              type="text"
              value={form.contactPerson}
              onChange={(e) =>
                setForm({ ...form, contactPerson: e.target.value })
              }
              
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Contact Email</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) =>
                setForm({ ...form, contactEmail: e.target.value })
              }
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Contact Phone</label>
            <input
              type="tel"
              value={form.contactPhone}
              onChange={(e) =>
                setForm({ ...form, contactPhone: e.target.value })
              }
              className="border rounded w-full p-2 mb-4"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update Drive" : "Add Drive"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ManageJobDrives;
