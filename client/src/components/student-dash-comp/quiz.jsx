import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Quiz = ({ category, limit, timeLimit, studentId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const timerRef = useRef(null);

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=7Sip4gsCl2ELUYKQh1LTzrQy7eY8hGAeWXIZ3zev&category=${category}&limit=${limit}`;
        const response = await axios.get(apiUrl);
        setQuestions(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching quiz questions');
      } finally {
        setLoading(false);
      }
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
  const handleRadioChange = (questionId, answerKey) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  // Validate and submit the quiz
  const handleSubmit = () => {
    let calculatedScore = 0;

    questions.forEach((question) => {
      const correctAnswerKey = Object.keys(question.correct_answers).find(
        (key) => question.correct_answers[key] === 'true'
      );

      if (userAnswers[question.id] === correctAnswerKey) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
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
        <ul className="mt-4">
          {questions.map((question) => {
            const correctAnswerKey = Object.keys(question.correct_answers).find(
              (key) => question.correct_answers[key] === 'true'
            );
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === correctAnswerKey;
            return (
              <li key={question.id} className={`p-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {question.question} <br />
                Your Answer: {question.answers[userAnswer] || 'Not answered'} <br />
                Correct Answer: {question.answers[correctAnswerKey]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Quiz Questions</h1>
        <div className="text-lg font-semibold">Time Remaining: {formatTime(timeRemaining)}</div>
      </div>
      <ul className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <li key={question.id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
              <ul className="list-disc pl-5">
                {Object.keys(question.answers).map((answerKey) =>
                  question.answers[answerKey] ? (
                    <li key={answerKey} className="mb-1">
                      <label>
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          checked={userAnswers[question.id] === answerKey}
                          onChange={() => handleRadioChange(question.id, answerKey)}
                        />
                        {question.answers[answerKey]}
                      </label>
                    </li>
                  ) : null
                )}
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
  category: 'code',
  limit: 20,
  timeLimit: 600, // 10 minutes
};

export default Quiz;
