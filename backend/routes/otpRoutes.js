const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController'); // Make sure the path is correct

router.post('/send-otp', otpController.sendOTP); // Ensure this function is defined
router.post('/verify-otp', otpController.verifyOTP); // Ensure this function is defined

module.exports = router;
