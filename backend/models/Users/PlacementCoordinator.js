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
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    officeAddress: {
        type: String,
    },
    roleDescription: {
        type: String,
    },
    termsAccepted: {
        type: Boolean,
        required: true,
    },
});

// Use the discriminator to extend the User model
const PlacementCoordinator = User.discriminator('PlacementCellCoordinator', PlacementCoordinatorSchema);

module.exports = PlacementCoordinator;
