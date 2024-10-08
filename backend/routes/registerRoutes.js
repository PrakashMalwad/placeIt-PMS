const express = require("express");
const router = express.Router();

// POST route for student registration
router.post("/student", (req, res) => {
  res.send("Student registration successful");
});

// POST route for placement coordinator registration
router.post("/placement-coordinator", (req, res) => {
  res.send("Placement coordinator registration successful");
});

// POST route for company coordinator registration
router.post("/company-coordinator", (req, res) => {
  res.send("Company coordinator registration successful");
});

module.exports = router;
