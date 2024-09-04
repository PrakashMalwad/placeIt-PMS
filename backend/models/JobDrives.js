const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value > new Date(),
            message: "Drive date must be a future date."
        }
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    eligibilityCriteria: {
        type: String,
        required: true,
        trim: true
    },
    jobDescription: {
        type: String,
        required: true,
        trim: true
    },
    applicationDeadline: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value > new Date(),
            message: "Application deadline must be a future date."
        }
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    contactPhone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.']
    }
});

const Drive = mongoose.model('Drive', driveSchema);

module.exports = Drive;
