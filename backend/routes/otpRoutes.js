// In your routes file
const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/otpController');

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  await sendOTP(email);
  res.json({ message: 'OTP sent to your email.' });
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const result = verifyOTP(email, otp);
  res.json(result);
});

module.exports = router;
