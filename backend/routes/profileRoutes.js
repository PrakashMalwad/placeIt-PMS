const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const {auth} = require('../middleware/auth'); // Assuming you have an authentication middleware

const router = express.Router();

// GET profile route
router.get('/myprofile', auth, getProfile);

// PUT profile route for updating
router.put('/myprofile', auth, updateProfile);

module.exports = router;
