// controllers/otpController.js

const SibApiV3Sdk = require('sib-api-v3-sdk');
const OTPModel = require('../models/otp');

// Initialize the Brevo client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_V3_KEY;  // Use environment variable for API key

// Generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
};

// Send OTP via email
const sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    const otpData = new OTPModel({ email, otp });

    try {
        // Save OTP in the database
        await otpData.save();

        // Create the email content
        const emailContent = {
            sender: { email: process.env.EMAIL_USER },
            to: [{ email: email }],
            subject: 'Your OTP Code',
            htmlContent: `<p>Your OTP code is: <strong>${otp}</strong></p>`
        };

        // Send the email
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        await apiInstance.sendTransacEmail(emailContent);

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP', error });
    }
};


// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
      // Find the OTP record in the database
      const otpRecord = await OTPModel.findOne({ email, otp });

      if (!otpRecord) {
          return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }

      // OTP is valid, you can add your logic here (e.g., user login, account activation, etc.)
      // You may want to delete the OTP record after successful verification
      await OTPModel.deleteOne({ _id: otpRecord._id });

      res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ success: false, message: 'Error occurred while verifying OTP', error });
  }
};

module.exports = { sendOTP, verifyOTP };
