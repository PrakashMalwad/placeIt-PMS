const Student = require('../models/Users/Students');
const winston = require('winston');
const { getCollegeByUserId } = require('../controllers/userController');
const User = require('../models/Users/User');

// Logger setup
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// Get all students by college
const getAllStudents = async (req, res) => {
  const { id: userId } = req.user; // Extract user ID from req.user

  try {
    // Assuming you have a method to get the college ID by user ID
    const user = await User.findById(userId).populate('college', 'name'); // Find user and populate college
    const collegeId = user.college._id; // Get the college ID from the user

    // Find all students in the same college
    const students = await Student.find({ college: collegeId }) // Filter by college ID
      .populate('college', 'name') // Populate college name
      .select('-password'); // Exclude password field

    res.json(students);
  } catch (error) {
    logger.error(`Error fetching students: ${error.message}`);
    res.status(500).json({ message: 'Error fetching students' });
  }
};


// get student by collge id
const getStudentsByCollegeId = async (req, res) => {
  const { id } = req.params;
  try {
    const students = await Student.find
    ({college: id})
    .populate('college', 'name');
    res.json(students);
  }
  catch (error) {
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

const getStudentsFromSameCollege = async (req, res) => {
  const { userId } = req.params; // Expecting userId to be passed in the request params

  try {
    // Get the college ID associated with the user
    const collegeId = await getCollegeByUserId(userId);

    if (!collegeId) {
      return res.status(404).json({ message: 'No college found for the given user ID.' });
    }

    // Fetch students from the same college
    const students = await Student.find({ college: collegeId }).populate('college', 'name');

    res.json(students);
  } catch (error) {
    logger.error(`Error fetching students from the same college: ${error.message}`);
    res.status(500).json({ message: 'Error fetching students from the same college.' });
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
  getStudentsByCollegeId,
  getStudentsFromSameCollege,
  createStudent,
  updateStudent,
  deleteStudent
};
