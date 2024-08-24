const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Login route - accessible by all roles
router.post('/login', loginUser);

// Registration route - accessible by all roles
router.post('/register', registerUser);

module.exports = router;
