import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../GeneralModal';
import { FaLink } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const ManageInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSelectModalOpen, setIsSelectModalOpen] = useState(false); // For selecting applicant
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For editing interview
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete confirmation
    const [selectedInterview, setSelectedInterview] = useState(null); // For editing or deleting
    const [message, setMessage] = useState('');
    const [packageAmount, setPackageAmount] = useState('');
const [jobTitle, setJobTitle] = useState('');

    const [jobLocation, setJobLocation] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    

    // Fetch all scheduled interviews for a given application
    const fetchInterviews = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/interviews/all`);
            setInterviews(response.data.interviews);
            setLoading(false);
        } catch (error) {
            setError('Failed to load scheduled interviews',error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews(); // Fetch interviews on component mount
    }, []);

    // Function to delete an interview
    const deleteInterview = async () => {
        try {
            await axios.delete(`${apiUrl}/api/interviews/delete/${selectedInterview._id}`);
            setInterviews(interviews.filter((interview) => interview._id !== selectedInterview._id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            setError('Failed to delete interview', error);
            setIsDeleteModalOpen(false);
        }
    };
//check if selected the applicant disable selct button


    // Select applicant
    const selectApplicant = async (interview) => {
        try {
            const payload = {
                jobTitle:jobTitle,
                message: message,
                package: packageAmount,
                location: jobLocation,
                joiningDate: joiningDate,
            };
            console.log(interview)
            await axios.put(`${apiUrl}/api/interviews/select/${interview.jobApplication}`, payload);

            fetchInterviews();
            setIsSelectModalOpen(false);
            setPackageAmount('');
            setJobLocation('');
            setJoiningDate('');
        } catch (error) {
            console.log(error);
            setError('Failed to select applicant', error.message);
            setIsSelectModalOpen(false);
        }
    };

    // Function to open the edit modal
    const openEditModal = (interview) => {
        setSelectedInterview(interview);
        setIsEditModalOpen(true);
    };

    // Function to update interview details
    const updateInterview = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/api/interviews/update/${selectedInterview._id}`, selectedInterview);
            setInterviews(
                interviews.map((interview) =>
                    interview._id === selectedInterview._id ? response.data : interview
                )
            );
            fetchInterviews();
            setIsEditModalOpen(false);
        } catch (error) {
            setError('Failed to update interview', error);
            setIsEditModalOpen(false);
        }
    };

    const resetselectapplicatantform = () => {
        setJobTitle('');
        setMessage('');
        setPackageAmount('');
        setJobLocation('');
        setJoiningDate('');

    }
    // Function to open the delete confirmation modal
    const openDeleteModal = (interview) => {
        setSelectedInterview(interview);
        setIsDeleteModalOpen(true);
    };

    // Function to open the select applicant modal
    const openSelectApplicantModal = (interview) => {
        setSelectedInterview(interview);
        setIsSelectModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Interviews</h2>

            {error && <p className="text-red-600">{error}</p>}

            {loading ? (
                <p>Loading interviews...</p>
            ) : interviews.length === 0 ? (
                <p>No interviews scheduled yet.</p>
            ) : (
                <div className="space-y-4">
                    {interviews.map((interview) => (
                        <div key={interview._id} className="p-4 border rounded-md shadow-sm bg-white">
                            <h3 className="text-lg font-semibold">Interview with {interview.candidateName}</h3>
                            <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {interview.time}</p>
                            <p><strong>Location:</strong> {interview.location}</p>
                            <p><strong>Type:</strong> {interview.type}</p>
                            {interview.type === 'Online' && (
                                <div className="mt-2 text-blue-600 flex items-center">
                                    <FaLink className="mr-2" />
                                    <a href={interview.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        Meeting Link
                                    </a>
                                </div>
                            )}
                            <p><strong>Status:</strong> {interview.status}</p>

                            {/* Buttons for updating or deleting */}
                            <button onClick={() => openEditModal(interview)} className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">Update</button>
                            <button onClick={() => openDeleteModal(interview)} className="bg-red-600 text-white px-4 py-2 rounded-md mr-2">Delete</button>
                           
                            <button onClick={() => openSelectApplicantModal(interview)} className="bg-green-500 text-white px-4 py-2 rounded-md" disabled={interview.status === 'Selected'}>Select Applicant</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Selecting the applicant */}
            <Modal
                isOpen={isSelectModalOpen}
                onClose={() => {setIsSelectModalOpen(false),resetselectapplicatantform()}}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedInterview && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Select Applicant</h2>
                        <p>Are you sure you want to select this applicant?</p>

                        {/* Form for entering placement details */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            selectApplicant(selectedInterview);
                        }}>
                    
                        <div className="mt-4">
                                <label className="block mb-2">Job Title:</label>
                                <input
                                    type="text"
                                    placeholder="Enter job title"
                                    className="border rounded-md p-2 w-full"
                                    required
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                        </div>

                            <div className="mt-4">
                                <label className="block mb-2">Package:</label>
                                <input 
                                    type="number" 
                                    placeholder="Enter package amount" 
                                    className="border rounded-md p-2 w-full"
                                    required 
                                    value={packageAmount} 
                                    onChange={(e) => setPackageAmount(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2">Location:</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter job location" 
                                    className="border rounded-md p-2 w-full"
                                    required 
                                    value={jobLocation} 
                                    onChange={(e) => setJobLocation(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2">Joining Date:</label>
                                <input 
                                    type="date" 
                                    className="border rounded-md p-2 w-full"
                                    required 
                                    value={joiningDate} 
                                    onChange={(e) => setJoiningDate(e.target.value)}
                                />
                            </div>
                            
                            <div className="mt-4">
                                <label className="block mb-2">Message For Applicant:</label>
                                <input
                                    type="text" 
                                    placeholder="Enter message to applicant"
                                    className="border rounded-md p-2 w-full"
                                    
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            
                            <div className="mt-4 flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Confirm Selection
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsSelectModalOpen(false)}
                                    className="ml-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                            
                        </form>
                    </div>
                )}
            </Modal>

            {/* Modal for editing interview */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {setIsEditModalOpen(false),setSelectedInterview('')}}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedInterview && (
                    <form onSubmit={updateInterview}>
                        <h2 className="text-xl font-semibold mb-4">Edit Interview</h2>
                        <div className="mt-4">
                            <label className="block mb-2">Date:</label>
                            <input
                                type="date"
                                className="border rounded-md p-2 w-full"
                                value={selectedInterview.date.split('T')[0]} // Assuming date is in ISO format
                                onChange={(e) => setSelectedInterview({ ...selectedInterview, date: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Time:</label>
                            <input
                                type="time"
                                className="border rounded-md p-2 w-full"
                                value={selectedInterview.time}
                                onChange={(e) => setSelectedInterview({ ...selectedInterview, time: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Location:</label>
                            <input
                                type="text"
                                className="border rounded-md p-2 w-full"
                                value={selectedInterview.location}
                                onChange={(e) => setSelectedInterview({ ...selectedInterview, location: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Type:</label>
                            <select
                                className="border rounded-md p-2 w-full"
                                value={selectedInterview.type}
                                onChange={(e) => setSelectedInterview({ ...selectedInterview, type: e.target.value })}
                            >
                                <option value="In-Person">In-Person</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Status:</label>
                            <select
                                className="border rounded-md p-2 w-full"
                                value={selectedInterview.status}
                                onChange={(e) => setSelectedInterview({ ...selectedInterview, status: e.target.value })}
                            >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Update</button>
                            <button type="button" onClick={() => setIsEditModalOpen(false)} className="ml-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
                        </div>
                    </form>
                )}
            </Modal>

            {/* Modal for delete confirmation */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedInterview && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Delete Interview</h2>
                        <p>Are you sure you want to delete the interview with {selectedInterview.candidateName}?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={deleteInterview}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="ml-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ManageInterviews;
