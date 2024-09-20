const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, expires: '10m' } // OTP expires in 10 minutes
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
