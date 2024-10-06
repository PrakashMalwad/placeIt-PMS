const express = require('express');
const Enquiry = require('../models/Enquiry');

// enquries on company and placement cell
const router = express.Router();

// Get all enquiries
router.get('/', async (req, res) => {
    try {
        const enquiries = await Enquiry.find();
        res.json(enquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new enquiry
router.post('/company-enquiries', async (req, res) => {
  const { companyName, contactName, email, phone, message, enquiryType} = req.body;

  try {
    const newEnquiry = new Enquiry({ companyName, contactName, email, phone, message ,enquiryType});
    await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).json({ message: 'Error saving enquiry' });
  }
});
// Get all enquiries
router.get('/p/', async (req, res) => {
  try {
      const enquiries = await Enquiry.find();
      res.json(enquiries);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
//general enquiries
router.post('/general-enquiries', async (req, res) => {
  const { contactName, email, phone, message, enquiryType} = req.body;

  try {
    const newEnquiry = new Enquiry({ contactName, email, phone, message ,enquiryType});
    await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).json({ message: 'Error saving enquiry' });
  }
});
// Create a new enquiry
router.post('/placement-enquiries', async (req, res) => {
const { collegeName, contactName, email, phone, message, enquiryType} = req.body;

try {
  const newEnquiry = new Enquiry({ collegeName, contactName, email, phone, message ,enquiryType});
  await newEnquiry.save();
  res.status(201).json({ message: 'Enquiry submitted successfully' });
} catch (error) {
  console.error('Error saving enquiry:', error);
  res.status(500).json({ message: 'Error saving enquiry' });
}
});

module.exports = router;
