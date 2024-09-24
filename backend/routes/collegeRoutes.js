const express = require('express');
const router = express.Router();
const College = require('../models/college');
const collegeController= require('../controllers/collegeController');
const college = require('../models/college');

// Route to get all colleges
router.get('/', collegeController.getAllColleges);

// Route to add a new college
router.post('/', collegeController.createCollege);

// Route to get a college by ID
router.get('/:id', collegeController.getCollegeById);


// Route to update a college by ID
router.put('/:id', collegeController.updateCollege);

// Route to delete a college by ID
router.delete('/:id', collegeController.deleteCollege);



module.exports = router;
