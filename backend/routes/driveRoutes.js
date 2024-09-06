
const express = require('express');
const router = express.Router();
const DriveController = require('../controllers/DriveController');

// Get all job drives with pagination
router.get('/', DriveController.getAllDrives);

// Search job drives by title
router.get('/search', DriveController.searchDrives);

// Get Drive by its Id.
router.get('/:id', DriveController.getDriveById);

// Create a new job drive
router.post('/', DriveController.createDrive);

// Update an existing job drive
router.put('/:id', DriveController.updateDrive);

// Delete a job drive
router.delete('/:id', DriveController.deleteDrive);

module.exports = router;
