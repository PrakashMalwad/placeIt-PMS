const express = require("express");
const router = express.Router();

const Student = require("../models/Users/Students");
router.get("/skills", async (req, res) => {
  const studentId = req.user.id;
  try {
    const student = await Student.findById(studentId).select("skills");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ skills: student.skills });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving skills", error: error.message });
  }
});

router.post("/skills", async (req, res) => {
  const studentId = req.user.id;
  const { skillName, proficiency } = req.body;
  console.log(req.body);
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.skills.push({ skillName, proficiency });
    await student.save();

    return res.status(201).json({ message: "Skill added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding skill", error: error.message });
  }
});

//delete all skill
router.delete("/skills", async (req, res) => {
  const studentId = req.user.id;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.skills = [];
    await student.save();

    return res.status(200).json({ message: "Skills deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting skills", error: error.message });
  }
});
module.exports = router;
