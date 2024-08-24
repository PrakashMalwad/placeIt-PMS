const express = require('express');
const router = express.Router();
const College = require('../models/College');

// Route to get all colleges
router.get('/get-colleges', async (req, res) => {
  try {
    const colleges = await College.find(); 
    res.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/add-college', async (req, res) => {
  try {
      const newCollege = new College(req.body);
      const savedCollege = await newCollege.save();
      res.status(201).json(savedCollege);
  } catch (error) {
      res.status(400).json({ message: 'Error adding college', error });
  }
});
  
module.exports = router;
