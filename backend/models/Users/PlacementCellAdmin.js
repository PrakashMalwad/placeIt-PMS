const mongoose = require('mongoose');
const User = require('./User'); // Import the root User model
const College = require('../college');

// Define the Placement Cell Admin schema
const PlacementCellAdminSchema = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },
    departments: { type: String },

    // College-related fields to be verified
    collegeName: { type: String, required: true },
    collegeAddress: { type: String, required: true },
    collegeContactNumber: { type: String, required: true },
    collegeWebsite: { type: String, required: true },

    
    comments: {
        type: String, // Comments from the admin regarding the verification
    }
});

// Pre-save middleware to automatically create a College instance
PlacementCellAdminSchema.pre("save", async function (next) {
    if (this.isNew && !this.college) {
        try {
            const newCollege = new College({
                name: this.collegeName,
                address: this.collegeAddress || "",
                contactNumber: this.collegeContactNumber || "",
                website: this.collegeWebsite || "",
            });
            await newCollege.save(); // Save the College instance
            this.college = newCollege._id; // Associate the College instance with the PlacementCellAdmin
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Use the discriminator to extend the User model directly
const PlacementCellAdmin = User.discriminator('PlacementCellAdmin', PlacementCellAdminSchema);

module.exports = PlacementCellAdmin;
