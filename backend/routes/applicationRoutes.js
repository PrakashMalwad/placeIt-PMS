const express = require('express');
const {
    getAllApplications,
    getApplicationByStudentId,
    createApplication,
    updateApplication,
    deleteApplication,
    getApplicationByDriveId,
    countApplicationByUser
} = require('../controllers/applicationController');

const router = express.Router();

// Route to get all job applications
router.get('/', getAllApplications);

// Route to get application by student id
router.get('/student-count/', countApplicationByUser);
// Route to get applications by student ID
router.get('/c/', getApplicationByStudentId);
router.get('/student/:id', getApplicationByStudentId);
// Route to get applications by drive ID
router.get('/drive/:id', getApplicationByDriveId);
// Route to create a new job application
router.post('/', createApplication);

// Route to update a job application (e.g., Withdraw)
router.put('/:id', updateApplication);

// Route to delete a job application
router.delete('/:id', deleteApplication);

module.exports = router;
