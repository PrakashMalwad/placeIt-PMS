import  { useState } from "react";

const CompanyCoordinatorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyname: "",
    profileImg: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImg: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      {/* Form fields for company coordinator */}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Company Name</label>
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          name="companyname"
          value={formData.companyname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Profile Image</label>
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="file"
          name="profileImg"
          onChange={handleFileChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
        type="submit"
      >
        Register as Company Coordinator
      </button>
    </form>
  );
};

export default CompanyCoordinatorForm;
