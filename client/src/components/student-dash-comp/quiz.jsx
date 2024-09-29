import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; 
import quizData from './test.json';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Quiz = ({ category, limit, timeLimit }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const timerRef = useRef(null);

  // Fetch quiz questions based on the selected category
  useEffect(() => {
    const fetchQuestions = () => {
      const selectedSubject = quizData.questions.find(
        (q) => q.subject.toLowerCase() === category.toLowerCase()
      );
      if (selectedSubject) {
        setQuestions(selectedSubject.questionsList.slice(0, limit)); // Limit the questions
      } else {
        setError('Subject not found');
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [category, limit]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      timerRef.current = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    } else if (timeRemaining === 0 && !submitted) {
      handleSubmit(); // Automatically submit when time runs out
    }

    return () => clearTimeout(timerRef.current);
  }, [timeRemaining, submitted]);

  // Handle answer selection
  const handleRadioChange = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Validate and submit the quiz
  const handleSubmit = async () => {
    let calculatedScore = 0;

    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });

    const calculatedProficiency = (calculatedScore / questions.length) * 100; // Proficiency in percentage

    setScore(calculatedScore);
    setSubmitted(true);
    setTimeRemaining(0)

    // Save the skill and proficiency to the database
    await saveSkillToDB(category, calculatedProficiency);
  };

  // Save the skill and proficiency to the database
  const saveSkillToDB = async (skillName, proficiency) => {
    try {
      const response = await axios.post(`${apiUrl}/api/my/skills`, {
        skillName, 
        proficiency,
      });
  
      if (response.status === 201) {
        console.log('Skill saved successfully');
      }
    } catch (error) {
      console.error('Error saving skill', error);
    }
  };
  

  // Display time remaining in mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (submitted) {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">Quiz Completed!</h1>
        <p>Your Score: {score} / {questions.length}</p>
        <p>Your Proficiency in {category}: {(score / questions.length) * 100}%</p>
        <ul className="mt-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <li key={index} className={`p-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {question.question} <br />
                Your Answer: {userAnswer || 'Not answered'} <br />
                Correct Answer: {question.correctAnswer}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-around mb-4">
        <h1 className="text-3xl font-bold">Questions</h1>
        <div className="text-lg font-semibold bg-slate-100 rounded-sm p-2 ml-2">Time Remaining: {formatTime(timeRemaining)}</div>
      </div>
      <ul className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <li key={index} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
              <ul className="list-disc pl-5">
                {question.options.map((option, optIndex) => (
                  <li key={optIndex} className="mb-1">
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={userAnswers[index] === option}
                        onChange={() => handleRadioChange(index, option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <div className="text-center p-4">No questions available.</div>
        )}
      </ul>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        disabled={Object.keys(userAnswers).length < questions.length}
      >
        Submit Quiz
      </button>
    </div>
  );
};

Quiz.propTypes = {
  category: PropTypes.string,
  limit: PropTypes.number,
  timeLimit: PropTypes.number,
  studentId: PropTypes.string.isRequired,
};

Quiz.defaultProps = {
  category: 'Linux', // Default category
  limit: 10, // Default limit
  timeLimit: 600, // 10 minutes
};

export default Quiz;
