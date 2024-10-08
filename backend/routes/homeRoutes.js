const express = require("express");

const College = require("../models/college");
const router = express.Router();
const Student = require("../models/Users/Students");
const CollegeCode = require("../models/CollegeCodes");
const auth = require("../middleware/auth");

const { getTotalDrives } = require("../controllers/DriveController");
const { getUserCount } = require("../controllers/userController");
const { getCompanyCoordinatorCount } = require("../controllers/userController");

const {
  getPlacementCoordinatorCount,
} = require("../controllers/userController");

const bcrypt = require("bcryptjs");

router.post("/register-student", async (req, res) => {
  try {
    const { password, college, collegeCode, ...studentData } = req.body;

    // Check if the college code exists
    const validCollegeCode = await CollegeCode.findOne({
      collegeid: college,
      code: collegeCode,
    });

    if (!validCollegeCode) {
      return res.status(400).json({ message: "Invalid college code" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create student with hashed password and associate it with the college
    const student = new Student({
      ...studentData,
      password: hashedPassword,
      college: college, // Associate student with the college
    });

    await student.save();
    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering student" + " " + error });
  }
});

// Home route
router.get("/", async (req, res) => {
  res.json({
    totalDrives: await getTotalDrives(),
    companyregister: await getCompanyCoordinatorCount(),
    placementcell: await getPlacementCoordinatorCount(),
    dailyUsers: await getUserCount(),
  });
});
const getColleges = async () => {
  try {
    // Fetch only _id and name fields from the colleges collection
    const colleges = await College.find({}, "_id name");
    return colleges;
  } catch (error) {
    console.error("Error fetching colleges:", error);
    throw error;
  }
};
//get colleges id and name
router.get("/colleges", async (req, res) => {
  res.json({
    colleges: await getColleges(),
  });
});

const {
  updatePlacementStatistics,
} = require("../services/placementStatisticService");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await updatePlacementStatistics(id);
  res.json({ message: "Placement statistics updated successfully" });
});
module.exports = router;
