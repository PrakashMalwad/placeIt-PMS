const Student = require('../models/Users/Students');
const winston = require('winston');

// Logger setup
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('college', 'name');
    res.json(students);
  } catch (error) {
    logger.error(`Error fetching students: ${error.message}`);
    res.status(500).json({ message: 'Error fetching students' });
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const student = await Student.findById(id).populate('college', 'name');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    logger.error(`Error fetching student: ${error.message}`);
    res.status(500).json({ message: 'Error fetching student' });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  

  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    logger.error(`Error creating student: ${error.message}`);
    res.status(500).json({ message: 'Error creating student' });
  }
};

// Update an existing student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { aboutme, dob, college, passingyear, qualification, stream, contactno, address, city, state, skills, designation, resume, profileImage, termsAccepted } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        aboutme,
        dob,
        college,
        passingyear,
        qualification,
        stream,
        contactno,
        address,
        city,
        state,
        skills,
        designation,
        resume,
        profileImage,
        termsAccepted
      },
      { new: true } // Return the updated student
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (error) {
    logger.error(`Error updating student: ${error.message}`);
    res.status(500).json({ message: 'Error updating student' });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting student: ${error.message}`);
    res.status(500).json({ message: 'Error deleting student' });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
