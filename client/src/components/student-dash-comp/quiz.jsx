import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Quiz = ({ category = 'code', tag = '', limit = 20 }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=7Sip4gsCl2ELUYKQh1LTzrQy7eY8hGAeWXIZ3zev&category=${category}&limit=${limit}&tag=${tag}`;
        const response = await axios.get(apiUrl);
        setQuestions(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching quiz questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, tag, limit]);

  const handleRadioChange = (questionId, answerKey) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Quiz Questions</h1>
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
    </div>
  );
};

Quiz.propTypes = {
  category: PropTypes.string,
  tag: PropTypes.string,
  limit: PropTypes.number,
};

Quiz.defaultProps = {
  category: 'code',
  tag: '',
  limit: 20,
};

export default Quiz;
