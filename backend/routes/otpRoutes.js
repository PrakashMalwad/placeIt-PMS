const express = require('express');
const router = express.Router();
const twilio = require('twilio'); // If using Twilio for SMS
const OTP = require('../models/OTP'); // Assuming you have an OTP model

// Your Twilio credentials
const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const client = new twilio(accountSid, authToken);

router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  try {
    // Send OTP via SMS using Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: 'your_twilio_phone_number',
      to: phoneNumber,
    });

    // Save OTP in database (implement your OTP model and logic)
    await OTP.create({ phoneNumber, otp });

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Verify OTP from database (implement your OTP model and logic)
    const otpRecord = await OTP.findOne({ phoneNumber, otp });
    if (otpRecord) {
      await OTP.deleteOne({ phoneNumber, otp }); // Optionally delete the OTP after successful verification
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

module.exports = router;
