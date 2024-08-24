const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    collegeAddress: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    collegeType: {
        type: String,
        required: true
    },
    collegeUniversity: {
        type: String,
        required: true
    },
    collegeState: {
        type: String,
        required: true
    },
    collegeCity: {
        type: String,
        required: true
    },
    collegePincode: {
        type: String,
        required: true
    },
    collegeEstablished: {
        type: Date,
        required: true
    },
    collegeAffiliated: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('College', CollegeSchema);
