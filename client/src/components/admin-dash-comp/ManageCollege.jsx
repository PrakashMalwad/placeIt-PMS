import { useState, useEffect } from "react";
import axios from "axios";
const CollegeManagement = () => {
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    website: "",
    logo: "",
    type: "",
    university: "",
    state: "",
    city: "",
    pincode: "",
    establishmentYear: "",
    affiliation: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [logoPreview, setLogoPreview] = useState(null); // For logo previe
  const collegesPerPage = 6; // Number of colleges per page

  useEffect(() => {
    fetchColleges(); // Fetch all colleges on mount
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/colleges`
      );
      setColleges(response.data);
    } catch (error) {
      setError(`Error fetching colleges: ${error.message}`);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);
  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      contactNumber: "",
      website: "",
      logo: "",
      type: "",
      university: "",
      state: "",
      city: "",
      pincode: "",
      establishmentYear: "",
      affiliation: "",
    });
    setLogoPreview(null);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files && files[0]) {
      setFile(files[0]); // Set the file state
      setLogoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Upload the logo if a file is selected
      let logoUrl = formData.logo; // Keep existing logo if no new file is uploaded
      if (file) {
        
        
        const fmd = new FormData();
        fmd.append("file", file); // Append the file to FormData
  
        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/file/upload-logo`,
          fmd, // Send the FormData directly
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
  
        logoUrl = uploadResponse.data.url; // Get the URL from the response
      }
  
      // Prepare form data for submission
      const collegeData = {
        ...formData,
        logo: logoUrl, // Use the uploaded logo URL
      };
  
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/colleges/${editingId}`,
          collegeData
        );
        setEditingId(null);
      } else {
        console.log(collegeData);
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/colleges`, collegeData);
      }
  
      fetchColleges(); // Refetch data
      resetForm();
    } catch (error) {
      setError(`Error submitting the form: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const handleEdit = (college) => {
    setFormData(college);
    setEditingId(college._id);
    setLogoPreview(college.logo);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/colleges/${id}`
        );
        fetchColleges(); // Refetch data after deletion
      } catch (error) {
        setError(`Error deleting the college: ${error.message}`);
      }
    }
  };

  // Pagination Logic
  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = colleges.slice(
    indexOfFirstCollege,
    indexOfLastCollege
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(colleges.length / collegesPerPage);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Manage Colleges
      </h2>

      {error && (
        <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center mb-4">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="name">
              College Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter college name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter college address"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter contact number"
            />
          </div>
          
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="University"
            >
              University
            </label>
            <input
              type="  "
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter University Name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="website"
            >
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter website URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="logo">
              Upload Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
            {logoPreview && (
              <div className="mt-4">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-24 h-24 object-cover"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold" htmlFor="type">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Type</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Community">Community</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="state"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter city"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="state"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter state"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold"
            htmlFor="pincode"
          >
            Pincode
          </label>
          <input
            type="number"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Pincode"
            minLength={6} //
            maxLength={6}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-lg font-semibold hover:bg-blue-700 transition-colors duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : editingId
            ? "Update College"
            : "Add College"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentColleges.map((college) => (
          <div
            key={college._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-bold mb-2">{college.name}</h3>
            <p className="text-gray-600 mb-4">{college.address}</p>
            <p className="text-gray-600">{college.contactNumber}</p>

            {college.logo && (
              <img
                src={college.logo}
                alt={`${college.name} Logo`}
                className="w-24 h-24 object-cover mt-4"
              />
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(college)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(college._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <ul className="flex list-none">
          {[...Array(totalPages).keys()].map((page) => (
            <li key={page} className="mx-1">
              <button
                onClick={() => paginate(page + 1)}
                className={`px-3 py-2 rounded ${
                  currentPage === page + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollegeManagement;
