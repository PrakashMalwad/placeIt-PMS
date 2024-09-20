const express = require('express');
const router = express.Router();
const College = require('../models/college');

// Route to get all colleges
router.get('/', async (req, res) => {
  try {
    const colleges = await College.find(); 
    res.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Route to add a new college
router.post('/', async (req, res) => {
  const { name, address, contactNumber, website, logo, type, university, state, city, pincode, establishmentYear, affiliation } = req.body;

  // Validation
  if (!name || !address || !contactNumber || !website || !logo || !type || !university || !state || !city || !pincode || !establishmentYear || !affiliation) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newCollege = new College({
      name,
      address,
      contactNumber,
      website,
      logo,
      type,
      university,
      state,
      city,
      pincode,
      establishmentYear,
      affiliation
    });

    const savedCollege = await newCollege.save();
    res.status(201).json(savedCollege);
  } catch (error) {
    console.error('Error adding college:', error);
    res.status(400).json({ message: 'Error adding college', error: error.message });
  }
});

module.exports = router;
