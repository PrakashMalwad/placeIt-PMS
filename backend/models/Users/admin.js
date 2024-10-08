const mongoose = require("mongoose");
const User = require("./User"); // Import User model

// Check if the discriminator already exists
if (!mongoose.modelNames().includes("Admin")) {
  // Define the Admin schema
  const AdminSchema = new mongoose.Schema({
    subrole: {
      type: String,
      enum: ["superadmin", "admin", "placementcelladmin", "companyadmin"],
      default: "admin",
    },
    permissions: {
      type: [String],
      enum: ["manageUsers", "viewReports", "configureSettings", "manageRoles"],
      default: ["manageUsers"],
    },
    contactno: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
  });

  // Use the discriminator to extend the User model
  User.discriminator("Admin", AdminSchema);
}

// Export the Admin model
module.exports = mongoose.model("Admin");
