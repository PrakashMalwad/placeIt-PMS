const crypto = require('crypto');
const { sendEmail } = require('./mailer');

let otpStorage = {}; // Simple in-memory storage for OTPs

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

const sendOTP = async (email) => {
  const otp = generateOTP();
  otpStorage[email] = {
    otp,
    expires: Date.now() + parseInt(process.env.OTP_EXPIRE_TIME) * 1000, // Set expiry time
  };

  await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
};
const verifyOTP = (email, enteredOtp) => {
    const otpData = otpStorage[email];
  
    if (!otpData) {
      return { valid: false, message: 'OTP not found or expired.' };
    }
  
    const isExpired = Date.now() > otpData.expires;
  
    if (isExpired) {
      delete otpStorage[email]; // Clear expired OTP
      return { valid: false, message: 'OTP expired.' };
    }
  
    if (otpData.otp === enteredOtp) {
      delete otpStorage[email]; // Clear OTP on successful verification
      return { valid: true, message: 'OTP verified successfully.' };
    } else {
      return { valid: false, message: 'Invalid OTP.' };
    }
  };

module.exports = { sendOTP, verifyOTP };
  