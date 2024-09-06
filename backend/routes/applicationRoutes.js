const express = require('express');
const router = express.Router();
const College = require('../models/applications');
const { getApplicationById,getAllApplications, createApplication,getApplicationByCollegeId } = require('../controllers/applicationController');

// Route to get all Jobapplications
router.get('/', getAllApplications);

// Route to get a application by ID
router.get('/get/:id', getApplicationById);

// Route to add new Job application
router.post('/',createApplication);

// Route to get application by college id
router.get('/id:',getApplicationByCollegeId);

// Route to update Job application

module.exports = router;