import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaUserPlus,
  FaTrash,
  FaEdit,
  FaPause,
  FaPlay,
  FaSpinner,
  FaExclamationCircle,
  FaCheck,
} from "react-icons/fa";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [colleges, setColleges] = useState([]); // Added colleges state
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    college: "",
    postedBy:"",
  });
  const [isModifyUserModalOpen, setIsModifyUserModalOpen] = useState(false); // Add this line
  const [modifiedUser, setModifiedUser] = useState({
    // Add this state
    name: "",
    email: "",
    password: "",
    role: "",
    college: "",
    postedBy:"",
  });
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set default header for all Axios requests
    }
  }, []);
  useEffect(() => {
    fetchUsers();
    fetchColleges();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setIsLoading(false);
        return;
      }
      const response = await axios.get(`${apiUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid token or token has expired");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenModifyModal = (user) => {
    setSelectedUser(user);
    setModifiedUser(user); // Pre-fill form with user data
    setIsModifyUserModalOpen(true);
  };

  const fetchColleges = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/colleges`);
      setColleges(response.data); // Storing fetched colleges in state
    } catch (error) {
      setError("Error fetching colleges: " + error.message);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/users`, newUser, );
      setUsers([...users, response.data]);
      setIsAddUserModalOpen(false);
      setNewUser({ name: "", email: "", password: "", role: "", college: "" }); // Reset form
      fetchColleges();
      fetchUsers();
    } catch (error) {
      setError("Error adding user: " + error.message);
    }
  };

  const handleModifyUser = async (id, updatedUser) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/users/${id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
      fetchColleges();
    } catch (error) {
      setError("Error modifying user: " + error.message);
    }
  };

  const handleToggleHoldStatus = async (id, isCurrentlyOnHold) => {
    try {
      const endpoint = isCurrentlyOnHold
        ? `${apiUrl}/api/users/${id}`
        : `${apiUrl}/api/users/${id}`; // Adjusted endpoints for hold/unhold

      const response = await axios.patch(endpoint, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setUsers(
        users.map((user) => (user._id === id ? response.data.user : user))
      );
      alert(response.data.message);
    } catch (error) {
      setError(`Error toggling hold status: ${error.message}`);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError("Error deleting user: " + error.message);
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/users/v/${id}`, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setUsers(
        users.map((user) => (user._id === id ? response.data.user : user))
      );
    } catch (error) {
      setError("Error verifying user: " + error.message);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "On Hold";
      case 1:
        return "Active";
      case 2:
        return "Not Verified";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <h1 className="text-4xl font-semibold">Manage Users</h1>

      <main className="flex-1 p-8">
        {isLoading ? (
          <div className="flex justify-center">
            <FaSpinner className="animate- text-4xl text-blue-600" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center bg-red-600 text-white p-4 rounded-lg">
            <FaExclamationCircle className="h-6 w-6 mr-2" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Users</h2>

              <button
                className=" m-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-3 rounded-lg flex items-center transition-transform transform hover:scale-105 active:scale-95"
                onClick={() => setIsAddUserModalOpen(true)}
              >
                <FaUserPlus className="mr-2" /> Add User
              </button>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Role</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">
                      {getStatusText(user.status)}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center"
                          onClick={() => handleOpenModifyModal(user)}
                        >
                          <FaEdit className="mr-2" /> Modify
                        </button>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center"
                          onClick={() => handleVerify(user._id)}
                        >
                          {user.status === 2 ? (
                            <>
                              <FaCheck className="mr-2" />
                              Verify
                            </>
                          ) : (
                            <>
                              <FaPause className="mr-2" />
                              UnVerify
                            </>
                          )}
                        </button>

                        <button
                          className={`text-white px-3 py-1 rounded-lg flex items-center ${
                            user.status === 0 ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          onClick={() =>
                            handleToggleHoldStatus(user._id, user.status === 0)
                          }
                        >
                          {user.status === 0 ? (
                            <FaPlay className="mr-2" />
                          ) : (
                            <FaPause className="mr-2" />
                          )}
                          {user.status === 0 ? "Unhold" : "Hold"}
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {isModifyUserModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Modify User</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Name"
                required
                value={modifiedUser.name}
                onChange={(e) =>
                  setModifiedUser({ ...modifiedUser, name: e.target.value })
                }
              />
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Email"
                required
                value={modifiedUser.email}
                onChange={(e) =>
                  setModifiedUser({ ...modifiedUser, email: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Password"
                required
                value={modifiedUser.password}
                onChange={(e) =>
                  setModifiedUser({ ...modifiedUser, password: e.target.value })
                }
              />
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={modifiedUser.role}
                required
                onChange={(e) =>
                  setModifiedUser({ ...modifiedUser, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="placement-cell">Placement Cell</option>
                <option value="company-coordinator"> Company</option>
              </select>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={modifiedUser.college}
                onChange={(e) =>
                  setModifiedUser({ ...modifiedUser, college: e.target.value })
                }
              >
                <option value="">Select College</option>
                {colleges.map((college) => (
                  <option key={college._id} value={college._id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setIsModifyUserModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleModifyUser}
              >
                Modify User
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Add New User</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Name"
                required
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Email"
                required
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Password"
                required
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newUser.role}
                required
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="placementcell-coordinator">
                  Placement Cell
                </option>
                <option value="company-coordinator">Company</option>
              </select>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newUser.college}
                onChange={(e) =>
                  setNewUser({ ...newUser, college: e.target.value })
                }
              >
                <option value="">Select College</option>
                {colleges.map((college) => (
                  <option key={college._id} value={college._id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setIsAddUserModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUser;
