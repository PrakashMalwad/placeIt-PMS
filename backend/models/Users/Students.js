const mongoose = require('mongoose');
const User = require('./User'); // Import User model
const College = require('../College'); // Import College model

// Define the Student schema
const StudentSchema = new mongoose.Schema({
    aboutme: { type: String },
    dob: { 
        type: Date,
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },
    passingyear: { 
        type: Date,
        required: true,
    },
    qualification: { 
        type: String,
        required: true,
    },
    stream: { type: String },
    contactno: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    skills: { type: String },
    designation: { type: String },
    resume: { type: String },
    termsAccepted: { type: Boolean, required: true }
});

// Virtual for calculating age
StudentSchema.virtual('age').get(function() {
    if (this.dob) {
        const ageDiff = Date.now() - this.dob.getTime();
        const ageDate = new Date(ageDiff); // milliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return null;
});



// Ensuring virtual fields are serialized
StudentSchema.set('toJSON', { virtuals: true });
StudentSchema.set('toObject', { virtuals: true });

// Using the discriminator to extend the User model
const Student = User.discriminator('Student', StudentSchema);

module.exports = Student;
