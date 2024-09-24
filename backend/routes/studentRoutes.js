const express = require('express');
const { getAllStudents, getStudentById, createStudent,getStudentsFromSameCollege, updateStudent, deleteStudent, } = require('../controllers/studentController');
const router = express.Router();


// Routes
router.get('/', getAllStudents);
router.get('/m/:id', getStudentsFromSameCollege);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;