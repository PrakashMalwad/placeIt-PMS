const express = require('express');
const router = express.Router();
const testResultController = require('../controllers/testResultController.js');

// Route to create a new test result
router.post('/', testResultController.createTestResult);

// Route to fetch all test results for a student
router.get('/student/:studentId', testResultController.getStudentResults);

// Route to fetch a single test result by ID
router.get('/:resultId', testResultController.getTestResultById);

// Optional: Route to update a test result (e.g., if there's a need to modify the score)
router.put('/:resultId', testResultController.updateTestResult);

module.exports = router;
