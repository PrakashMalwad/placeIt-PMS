const express = require('express');
const { getNotifications, markRead } = require('../controllers/notifyController'); // Use the correct controller file

const router = express.Router();

// GET request to fetch notifications
router.get('/:id', getNotifications);

// PUT request to mark a notification as read
router.put('/mark-read', markRead);

module.exports = router;
