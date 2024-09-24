import { FaArrowCircleRight } from 'react-icons/fa';
import Quiz from './quiz';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';

function Myskills() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
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


  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setShowQuiz(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Feature Notification */}
      <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <FaArrowCircleRight className="text-2xl text-red-500 mr-3" />
        <span className="text-sm text-gray-700">Feature will be added soon</span>
      </div>

      {/* Subject Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Select a Subject</h2>
        <div className="flex flex-wrap justify-center">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300 mx-2 my-2 ${selectedSubject && selectedSubject.id === subject.id ? 'bg-blue-600' : ''}`}
              onClick={() => handleSubjectSelect(subject)}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Section */}
      {showQuiz && selectedSubject && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">My Skills - {selectedSubject.name}</h2>
          <Quiz category={selectedSubject.name} />
        </div>
      )}
    </div>
  );
}

export default Myskills;
