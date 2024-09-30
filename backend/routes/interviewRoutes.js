const express = require("express");
const {
  scheduleInterview,
  getInterviewByStudent,
  getInterviewByCompany,
  countInterviewStudent,
  updateInterview,
  deleteInterview,
  getInterviews

} = require("../controllers/interviewController");

const router = express.Router();

// Routes
router.get("/all/", getInterviews);
router.delete("/delete/:id", deleteInterview);
router.put("/update/:id",updateInterview);
router.get("/company", getInterviewByCompany);
router.get("/student", getInterviewByStudent);
router.get("/student-count", countInterviewStudent);
router.post("/c/:id", scheduleInterview);


module.exports = router;
