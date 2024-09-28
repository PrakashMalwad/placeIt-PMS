import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaLink } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const StudentInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch interviews for the student
    const fetchStudentInterviews = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/interviews/student`);
            setInterviews(response.data.interviews); // Assuming the API returns an array of interviews
            setLoading(false);
        } catch (error) {
            console.error('Error fetching interviews:', error);
            setError('Failed to load your interviews.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentInterviews(); // Fetch student interviews when the component mounts
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6  min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Scheduled Interviews</h2>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            {loading ? (
                <p className="text-center text-gray-600">Loading interviews...</p>
            ) : interviews.length === 0 ? (
                <p className="text-center text-gray-600">No interviews scheduled yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviews.map((interview) => (
                        <div
                            key={interview._id}
                            className="p-6 border rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
                        >
                            <h3 className="text-xl font-bold mb-2">Interview with <span className='text-blue-900'>{interview.interviewerName}</span></h3>
                            <div className="mb-4  text-sm">
                                <span className="block"><strong>Candidate Name:</strong> {interview.candidateName}</span>
                                <span className="block flex items-center mt-1">
                                    <FaCalendarAlt className="mr-2" /> {new Date(interview.date).toLocaleDateString()}
                                </span>
                                <span className="block flex items-center mt-1">
                                    <FaClock className="mr-2" /> {interview.time}
                                </span>
                                <span className="block flex items-center mt-1">
                                    <FaMapMarkerAlt className="mr-2" /> {interview.location}
                                </span>
                            </div>
                            <div className="text-gray-600">
                                <strong>Type:</strong> {interview.type}
                            </div>
                            {interview.type === 'Online' && (
                                <div className="mt-2 text-blue-600 flex items-center">
                                    <FaLink className="mr-2" />
                                    <a
                                        href={interview.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        Meeting Link
                                    </a>
                                </div>
                            )}
                            <div className="mt-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
                                    ${interview.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                      interview.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                                      'bg-red-100 text-red-800'}`}>
                                    {interview.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentInterviews;
