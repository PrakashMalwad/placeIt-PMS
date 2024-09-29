
import Quiz from './quiz';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../GeneralModal'; // Custom Modal component
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Myskills( ) {
  const [skills, setSkills] = useState([]); // For storing skills fetched from DB
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Control for the main modal
  const [showWarning, setShowWarning] = useState(false); // Control for warning when closing
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [timer, setTimer] = useState(600); // Timer for the quiz (in seconds)

  const [subjects] = useState([
    { id: 1, name: 'Linux', totalQuestions: 99 },
    { id: 2, name: 'BASH', totalQuestions: 77 },
    { id: 3, name: 'PHP', totalQuestions: 181 },
    { id: 4, name: 'Docker', totalQuestions: 125 },
    { id: 5, name: 'HTML', totalQuestions: 140 },
    { id: 6, name: 'MySQL', totalQuestions: 153 },
    { id: 7, name: 'WordPress', totalQuestions: 66 },
    { id: 8, name: 'Laravel', totalQuestions: 10 },
    { id: 9, name: 'Kubernetes', totalQuestions: 136 },
    { id: 10, name: 'JavaScript', totalQuestions: 26 },
    { id: 11, name: 'DevOps', totalQuestions: 23 },
    { id: 12, name: 'Python', totalQuestions: 0 },
  ]);

  // Fetch skills from the backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/my/skills`);
        setSkills(response.data.skills);
        setLoadingSkills(false);
      } catch (err) {
        setError('Error fetching skills',err);
        setLoadingSkills(false);
      }
    };
    
    fetchSkills();
  }, );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    if (timer > 0 && selectedSubject) {
      setShowWarning(true); // Warn the user if there's an active quiz
    } else {
      setShowModal(false);
      setSelectedSubject(null); // Reset subject when modal closes
    }
  };

  const confirmCloseModal = () => {
    setShowWarning(false);
    setShowModal(false);
    setSelectedSubject(null);
    setTimer(600); // Reset timer for the next quiz
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setTimer(600); // Reset timer for the quiz
    setShowWarning(false); // Hide warning if re-opening
  };

  useEffect(() => {
    let quizTimer;
    if (selectedSubject && timer > 0) {
      quizTimer = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(quizTimer);
  }, [selectedSubject, timer]);

  return (
    <div className="container mx-auto p-6">
      {/* Show My Skills */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">My Skills</h2>
        {loadingSkills ? (
          <div>Loading skills...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : skills.length > 0 ? (
          <ul className="space-y-4">
  {skills.map((skill, index) => (
    <li key={index} className="p-5 bg-gradient-to-r from-blue-600 to-blue-200 shadow-lg rounded-2xl transform hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white tracking-wide">
          {skill.skillName}
        </h2>
        <div className="flex items-center">
          <span className=" bg-slate-200 px-4 py-1 m-2 rounded-full text-sm font-medium">
            Proficiency: {skill.proficiency}%
          </span>
        </div>
      </div>
    </li>
  ))}
</ul>

        ) : (
          <div>No skills added yet. Take a test to add skills.</div>
        )}
      </div>

      {/* Button to Open Modal */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300"
          onClick={openModal}
        >
          Check Your Skills
        </button>
      </div>

      {/* Main Modal for Subject Selection or Quiz */}
      <Modal isOpen={showModal} onClose={closeModal}>
        {!selectedSubject ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Select a Subject to Test Your Skills</h2>
            <div className="flex flex-wrap justify-center">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300 mx-2 my-2"
                  onClick={() => handleSubjectSelect(subject)}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4"> <span
            className="text-white bg-green-600 p-2 rounded-lg mr-2">{selectedSubject.name}</span>
            Skill Test </h2>
            <Quiz
              category={selectedSubject.name}
              limit={10} // Limit of questions (can be dynamic)
              timeLimit={600} // Time limit (10 minutes in seconds)
             // Fetch dynamically
            />
          </>
        )}
      </Modal>

      {/* Warning Modal */}
      <Modal isOpen={showWarning} onClose={() => setShowWarning(false)}>
        <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
        <p className="mb-4">You have an ongoing quiz. Closing this will discard your progress.</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600 transition duration-300"
            onClick={confirmCloseModal}
          >
            Close Anyway
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            onClick={() => setShowWarning(false)}
          >
            Keep Quiz Open
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Myskills;
