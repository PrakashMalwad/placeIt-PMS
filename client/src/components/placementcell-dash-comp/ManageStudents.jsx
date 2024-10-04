import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaSpinner, FaExclamationCircle, FaCheck, FaPause, FaTimes, FaPlay } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toast for notifications

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
 
  const [colleges, setColleges] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    role:"student",
    contactno: "",
    college: "",
    
  });
  const [isModifyStudentModalOpen, setIsModifyStudentModalOpen] = useState(false);
  const [modifiedStudent, setModifiedStudent] = useState({
    name: "",
    email: "",
    password: "",
    role:"student",
    contactno: "",
    college: "",

  });

  useEffect(() => {
    fetchStudents();
    fetchColleges();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setIsLoading(false);
        return;
      }
      const response = await axios.get(`${apiUrl}/api/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
       
      });
      setStudents(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching students: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchColleges = async () => {
    try {
      const storedUser = sessionStorage.getItem('user');
      const token = sessionStorage.getItem("token");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const currentuserId = user ? user.id : null;
      // const user = sessionStorage.getItem("user");
      const response = await fetch(`${apiUrl}/api/users/mycollege/${currentuserId}`,{ headers: {
        Authorization: `Bearer ${token}`,
      },})
      ;
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  useEffect(() => {
    if (colleges.length > 0) {
      const filteredStudents = students.filter(student => 
        colleges.some(college => college._id === student.college._id)
      );
      setStudents(filteredStudents);
    }
  }, [colleges, students]);


  const handleOpenModifyModal = (student) => {
    setSelectedStudent(student);
    setModifiedStudent({
      name: student.name || "",
      email: student.email || "",
      contactno: student.contactno || "",
      password: student.password || "",
    });
    setIsModifyStudentModalOpen(true);
  };

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.email || !newStudent.contactno || !newStudent.college) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/api/users`, newStudent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents([...students, response.data]);
      setIsAddStudentModalOpen(false);
      fetchStudents()
      setNewStudent({ name: "", email: "", password: "", contactno: "", college: "", role: "student" });
      toast.success("Student added successfully");
    } catch (error) {
      toast.error("Error adding student: " + error.message);
    }
  };

  const handleModifyStudent = async () => {
    if (!modifiedStudent.name || !modifiedStudent.email || !modifiedStudent.contactno) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/users/${selectedStudent._id}`,
        modifiedStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(students.map((student) =>
        student._id === selectedStudent._id ? response.data : student
      ));
      setIsModifyStudentModalOpen(false);
      toast.success("Student modified successfully");
    } catch (error) {
      toast.error("Error modifying student: " + error.message);
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
      setStudents(
        students.map((student) => (student._id === id ? response.data.user : student))
      );
      alert(response.data.message);
    } catch (error) {
      setError(`Error toggling hold status: ${error.message}`);
    }
  };
  const handleVerify = async (id) => {
    try {
      const response = await axios.patch(`${apiUrl}/api/users/v/${id}`, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setStudents(
        students.map((student) => (student._id === id ? response.data.user : student))
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

  const handleDeleteStudent = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`${apiUrl}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter((student) => student._id !== id));
      setError(null);
      toast.success("Student deleted successfully");
    } catch (error) {
      setError("Error deleting student: " + error.message);
      toast.error("Error deleting student");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 shadow-md">
        <h1 className="text-3xl font-bold">Manage Students</h1>
      </header>

      <main className="flex-1 p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center bg-red-600 text-white p-4 rounded-lg shadow-md">
            <FaExclamationCircle className="h-6 w-6 mr-2" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Students</h2>
              <button
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105 active:scale-95"
                onClick={() => setIsAddStudentModalOpen(true)}
              >
                <FaPlus className="mr-2" /> Add Student
              </button>
            </div>

            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                    <td className="border px-4 py-2">{getStatusText(student.status)}</td>
                    <td className="border px-4 py-2">{student.contactno}</td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center transition-transform transform hover:scale-105"
                          onClick={() => handleOpenModifyModal(student)}
                        >
                          <FaEdit className="mr-2" /> Modify
                        </button>
                        <button
                            className={`${
                              student.status === 0
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            } text-white px-2 py-1 rounded`}
                            onClick={() =>
                              handleToggleHoldStatus(
                                student._id,
                                student.status === 0
                              )
                            }
                          >
                            {student.status === 0 ? <FaPlay /> : <FaPause />}
                          </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center transition-transform transform hover:scale-105"
                          onClick={() => handleDeleteStudent(student._id)}
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                       
                          {/* Conditionally render the verify button if the user is not verified (status === 2) */}
                         
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded"
                              onClick={() => handleVerify(student._id)}
                            >
                              {student.status === 2 ? <div className="flex row-span-1 justify-center items-center"><FaCheck className="mr-2"/>Verify</div> : <div className="flex row-span-1 justify-center items-center "><FaTimes className="mr-2"/>UnVerify</div> }
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

      {isModifyStudentModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-md">
            <h2 className="text-2xl mb-4 font-semibold">Modify Student</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Name"
                value={modifiedStudent.name}
                onChange={(e) =>
                  setModifiedStudent({ ...modifiedStudent, name: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="password"
                value={modifiedStudent.password}
                onChange={(e) =>
                  setModifiedStudent({ ...modifiedStudent, password: e.target.value })
                }
              />
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Email"
                value={modifiedStudent.email}
                onChange={(e) =>
                  setModifiedStudent({ ...modifiedStudent, email: e.target.value })
                }
              />
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Phone"
                value={modifiedStudent.phone}
                onChange={(e) =>
                  setModifiedStudent({ ...modifiedStudent, contactno: e.target.value })
                }
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setIsModifyStudentModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleModifyStudent}
              >
                Modify Student
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddStudentModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-md">
            <h2 className="text-2xl mb-4 font-semibold">Add New Student</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Password"
                value={newStudent.password}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, password : e.target.value })
                }
              />
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
              />
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Phone"
                value={newStudent.phone}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, contactno: e.target.value })
                }
              />
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={newStudent.college}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, college: e.target.value })
                }
              >console.log(colleges)
                <option value="">Select College</option>
                  <option key={colleges._id} value={colleges._id}>
                    {colleges.name}
                  </option>
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setIsAddStudentModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleAddStudent()}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageStudents;
