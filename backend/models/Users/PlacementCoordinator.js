const mongoose = require("mongoose");
const User = require("./User");

// Define the Placement Cell Coordinator schema
const PlacementCoordinatorSchema = new mongoose.Schema({
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  department: {
    type: String,
  },
  contactno: {
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
const PlacementCoordinator = User.discriminator(
  "PlacementCellCoordinator",
  PlacementCoordinatorSchema
);

module.exports = PlacementCoordinator;
