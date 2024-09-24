const TestResult = require('../models/TestResult');
const user = require('../models/Users/User');

// Create a new test result
exports.createTestResult = async (req, res) => {
  const { studentId, testType, score } = req.body;

  try {
    // Validate if the student exists
    const student = await user.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create a new test result
    const newTestResult = new TestResult({
      student: studentId,
      testType,
      score,
      dateTaken: new Date(),
    });

    await newTestResult.save();
    res.status(201).json({ message: 'Test result saved successfully', result: newTestResult });
  } catch (error) {
    console.error('Error saving test result:', error);
    res.status(500).json({ message: 'Error saving test result' });
  }
};

// Fetch test results for a specific student
exports.getStudentResults = async (req, res) => {
  const { studentId } = req.params;

  try {
    const results = await TestResult.find({ student: studentId }).populate('student');
    if (results.length === 0) {
      return res.status(404).json({ message: 'No test results found for the student' });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ message: 'Error fetching test results' });
  }
};

// Fetch a single test result
exports.getTestResultById = async (req, res) => {
  const { resultId } = req.params;

  try {
    const result = await TestResult.findById(resultId).populate('student');
    if (!result) {
      return res.status(404).json({ message: 'Test result not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching test result:', error);
    res.status(500).json({ message: 'Error fetching test result' });
  }
};

// Update a test result (optional)
exports.updateTestResult = async (req, res) => {
  const { resultId } = req.params;
  const { score } = req.body;

  try {
    const result = await TestResult.findById(resultId);
    if (!result) {
      return res.status(404).json({ message: 'Test result not found' });
    }

    // Update the score
    result.score = score;
    await result.save();

    res.status(200).json({ message: 'Test result updated successfully', result });
  } catch (error) {
    console.error('Error updating test result:', error);
    res.status(500).json({ message: 'Error updating test result' });
  }
};
