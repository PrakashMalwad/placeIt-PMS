import  { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const ScheduleInterview = () => {
    const  {id:applicationId } = useParams(); // Get the application ID from the route
    console.log(useParams())
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      }, []);
    // Define the state for the form fields
    const [interviewerName, setInterviewerName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('Online'); // Default to 'Online'
    const [link, setLink] = useState('');

    // Define the state for handling errors and messages
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const interviewData = {
                interviewerName,
                date,
                time,
                location,
                type,
                link: type === 'Online' ? link : '' // Only include the link if the interview type is 'Online'
            };

            const response = await axios.post(`${apiUrl}/api/interviews/schedule/${applicationId}`, interviewData);

            if (response.status === 201) {
                setSuccess('Interview scheduled successfully');
                setError('');
                // Redirect to another page if needed, e.g., interview list
                navigate('../manage-interview'); // Adjust this path to where you want to redirect after scheduling
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error scheduling the interview');
            setSuccess('');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Schedule Interview</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Interviewer Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={interviewerName}
                        onChange={(e) => setInterviewerName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="date"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Time</label>
                    <input
                        type="time"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Interview Type</label>
                    <select
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                {type === 'Online' && (
                    <div>
                        <label className="block text-sm font-medium">Meeting Link</label>
                        <input
                            type="url"
                            className="mt-1 block w-full p-2 border rounded-md"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter meeting link"
                            required
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Schedule Interview
                </button>
            </form>
        </div>
    );
};

export default ScheduleInterview;
