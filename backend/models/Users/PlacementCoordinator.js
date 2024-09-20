const mongoose = require('mongoose');
const User = require('./User'); // Assuming User is the base model

// Define the Placement Cell Coordinator schema
const PlacementCoordinatorSchema = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',   
        required: true,
    },
    department: {
        type: String,
        
    },
    contactPerson: {
        type: String,
        trim: true},
    contactEmail: {
        type: String,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    },
    contactNumber: {
        type: String,
    },
    officeAddress: {
        type: String,
    },
    roleDescription: {
        type: String,
    },
    termsAccepted: {
        type: Boolean,
        default: false,
    },
});

// Use the discriminator to extend the User model
const PlacementCoordinator = User.discriminator('PlacementCellCoordinator', PlacementCoordinatorSchema);

module.exports = PlacementCoordinator;
