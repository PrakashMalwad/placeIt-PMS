const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const {auth} = require('../middleware/auth'); // Assuming you have an authentication middleware
const Placement = require("../models/placement");
const Company = require("../models/company");
const router = express.Router();

// GET profile route
router.get('/myprofile', auth, getProfile);

// PUT profile route for updating
router.put('/myprofile', auth, updateProfile);router.get("/placedJob/", auth, async (req, res) => {
    try {
      const id = req.user.id; 
      const studentPlacement = await Placement.findOne({ student: id });
        
      if (!studentPlacement) {
        return res.status(200).json({ message: "Student Placement not found" });
      }
  //get company name from company id
        const companyName = await Company
        .findById(studentPlacement.placedCompany)
        .select("companyname");
        studentPlacement.placedCompany = companyName.companyname;

      res.status(200).json({ studentPlacement });
    } catch (error) {
      console.error("Error fetching placement:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  
module.exports = router;
