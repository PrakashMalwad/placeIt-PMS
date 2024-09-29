
// Require express
const express = require('express');
const app = express();
const router = express.Router();

// Require the CollegeCodeController
const collegeController = require('../controllers/collegeController');

// Route to generate code for a college
router.get('/generate-college-code', collegeController.generateCollegeCode);
router.delete('/delete-college-code', collegeController.deleteCollegeCode);
router.get('/get', collegeController.getCollegeCode);


module.exports = router;
