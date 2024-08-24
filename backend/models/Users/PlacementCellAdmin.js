const mongoose = require("mongoose");
const Admin = require("./admin");

// Define the Placement Cell Admin schema
const PlacementCellAdminSchema = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },
    department: { type: String },

    // College-related fields to be verified
    collegeName: { type: String, required: true },
    collegeAddress: { type: String, required: true },
    collegeContactNumber: { type: String, required: true },
    collegeWebsite: { type: String, required: true },
    // Account status
    active: {
        type: Number,
        enum: [0, 1, 2],
        default: 2,
    },
    Comments: {
        type: String,
    } // Comments from the admin regarding the verification
});

// Pre-save middleware to automatically create a College instance
PlacementCellAdminSchema.pre("save", async function (next) {
    if (this.isNew && !this.college) {
        // Check if it's a new document and college isn't already set
        try {
            const newCollege = new College({
                name: this.collegeName,
                address: this.collegeAddress || "",
                contactNumber: this.collegeContactNumber || "",
                website: this.collegeWebsite || "",
            }); // Create a new College instance with the provided details or defaults
            await newCollege.save(); // Save the College instance
            this.college = newCollege._id; // Associate the College instance with the PlacementCellAdmin
        } catch (error) {
            return next(error);
        }
    }
    next();
});
// Use the discriminator to extend the Admin model
const PlacementCellAdmin = Admin.discriminator(
    "PlacementCellAdmin",
    PlacementCellAdminSchema
);

module.exports = PlacementCellAdmin;
