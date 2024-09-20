const mongoose = require('mongoose');

// Assuming you have a Student schema defined somewhere
const Student = require('./Users/Students'); 

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    proficiency: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    },
    yearsOfExperience: {
        type: Number,
        default:0,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    testResult:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestResult',
        required: true
    }
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;