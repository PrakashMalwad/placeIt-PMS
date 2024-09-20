const express = require('express');
const router = express.Router();
const driveController = require('../controllers/DriveController');

// Job Drive Routes
router.get('/', driveController.getAllDrives);
router.get('/:id', driveController.getDriveById);
router.get('/byuser/:id',driveController.getDriveByUser);
router.post('/', driveController.createDrive);
router.put('/:id', driveController.updateDrive);
router.delete('/:id', driveController.deleteDrive);


module.exports = router;
