import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from'../GeneralModal';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const ManageInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null); // For editing or deleting
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete confirmation

    const navigate = useNavigate();

    // Fetch all scheduled interviews for a given application
    const fetchInterviews = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/interviews/all`);
            setInterviews(response.data.interviews);
            setLoading(false);
        } catch (error) {
            setError('Failed to load scheduled interviews');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews(); // Fetch interviews on component mount
    }, []);

    // Function to delete an interview
    const deleteInterview = async () => {
        try {
            await axios.delete(`${apiUrl}/api/interviews/delete${selectedInterview._id}`);
            setInterviews(interviews.filter((interview) => interview._id !== selectedInterview._id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            setError('Failed to delete interview');
            setIsDeleteModalOpen(false);
        }
    };

    // Function to open the edit modal
    const openEditModal = (interview) => {
        setSelectedInterview(interview);
        setIsModalOpen(true);
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
            setIsModalOpen(false);
        } catch (error) {
            setError('Failed to update interview');
            setIsModalOpen(false);
        }
    };

    // Function to open the delete confirmation modal
    const openDeleteModal = (interview) => {
        fetchInterviews();
        setSelectedInterview(interview);
        setIsDeleteModalOpen(true);
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
                        <div
                            key={interview._id}
                            className="p-4 border rounded-md shadow-sm bg-white"
                        >
                            <h3 className="text-lg font-semibold">
                                Interview with {interview.candidateName}
                            </h3>
                            <p>
                                <strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Time:</strong> {interview.time}
                            </p>
                            <p>
                                <strong>Location:</strong> {interview.location}
                            </p>
                            <p>
                                <strong>Type:</strong> {interview.type}
                            </p>
                            {interview.type === 'Online' && (
                                <p>
                                    <strong>Meeting Link:</strong>{' '}
                                    <a href={interview.link} target="_blank" rel="noopener noreferrer">
                                        {interview.link}
                                    </a>
                                </p>
                            )}
                            <p>
                                <strong>Status:</strong> {interview.status}
                            </p>

                            {/* Buttons for updating or deleting */}
                            <button
                                onClick={() => openEditModal(interview)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => openDeleteModal(interview)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for editing interview */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedInterview && (
                    <form onSubmit={updateInterview}>
                        <h2 className="text-xl font-semibold mb-4">Update Interview</h2>
                        <div>
                            <label className="block text-sm font-medium">Interviewer Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full p-2 border rounded-md"
                                value={selectedInterview.interviewerName}
                                onChange={(e) =>
                                    setSelectedInterview({ ...selectedInterview, interviewerName: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Date</label>
                            <input
                                type="date"
                                className="mt-1 block w-full p-2 border rounded-md"
                                value={new Date(selectedInterview.date).toISOString().substr(0, 10)}
                                onChange={(e) =>
                                    setSelectedInterview({ ...selectedInterview, date: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Time</label>
                            <input
                                type="time"
                                className="mt-1 block w-full p-2 border rounded-md"
                                value={selectedInterview.time}
                                onChange={(e) =>
                                    setSelectedInterview({ ...selectedInterview, time: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Update Interview
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="ml-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </Modal>

            {/* Modal for delete confirmation */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this interview?</p>
                <div className="mt-4">
                    <button
                        onClick={deleteInterview}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Confirm Delete
                    </button>
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="ml-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ManageInterviews;
