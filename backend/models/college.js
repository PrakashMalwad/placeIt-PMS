const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
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
    type: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    establishmentYear: {
        type: Number, 
        required: true
    },
    affiliation: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('College', CollegeSchema);
