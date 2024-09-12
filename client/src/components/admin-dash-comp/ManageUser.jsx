import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaUserPlus, FaTrash, FaEdit, FaPause, FaPlay, FaSpinner, FaExclamationCircle, FaCheck } from 'react-icons/fa';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
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
        setError('Invalid token or token has expired');
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiUrl}/api/users`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, response.data]);
      setIsAddUserModalOpen(false);
      setNewUser({ name: '', email: '', password: '',role:''});
    } catch (error) {
      setError('Error adding user: ' + error.message);
    }
  };

  const handleModifyUser = async (id, updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${apiUrl}/api/users/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => (user._id === id ? response.data : user)));
      
    } catch (error) {
      setError('Error modifying user: ' + error.message);
    }
  };

  const handleToggleHoldStatus = async (id, isCurrentlyOnHold) => {
    try {
      const endpoint = isCurrentlyOnHold 
        ? `${apiUrl}/api/users/${id}`
        : `${apiUrl}/api/users/${id}`;

      const response = await axios.patch(endpoint);
      setUsers(users.map(user => (user._id === id ? response.data.user : user)));
      alert(response.data.message);
    } catch (error) {
      setError(`Error toggling hold status: ${error.message}`);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${apiUrl}/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      setError('Error deleting user: ' + error.message);
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/users/v/${id}`);
      setUsers(users.map(user => (user._id === id ? response.data.user : user)));
    } catch (error) {
      setError('Error verifying user: ' + error.message);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'On Hold';
      case 1:
        return 'Active';
      case 2:
        return 'Not Verified';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <h1 className="text-4xl font-semibold">Manage Users</h1>

      <main className="flex-1 p-8">
        {isLoading ? (
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
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
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-3 rounded-lg flex items-center transition-transform transform hover:scale-105 active:scale-95"
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
                    <td className="border px-4 py-2">{getStatusText(user.status)}</td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center"
                          onClick={() => setSelectedUser(user)} 
                        >
                          <FaEdit className="mr-2" /> Modify
                        </button>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center"
                          onClick={() => handleVerify(user._id)}
                        >
                          <FaCheck className="mr-2" /> Verify
                        </button>
                        <button
                          className={`text-white px-3 py-1 rounded-lg flex items-center ${
                            user.status === 0 ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          onClick={() => handleToggleHoldStatus(user._id, user.status === 0)}
                        >
                          {user.status === 0 ? <FaPlay className="mr-2" /> : <FaPause className="mr-2" />}
                          {user.status === 0 ? 'Unhold' : 'Hold'}
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

      

      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Add User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
            >
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-4">
                Password:
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-4">
                Role:
                <input
                  type="text"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  required
                />
              </label>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Add User
              </button>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-red-500 hover:underline ml-4"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUser;
