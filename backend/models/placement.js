const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the student
  placedCompany: { type: String, required: true },
  jobTitle: {
    type: String,
  },
  package: { type: Number, required: true },
  location: { type: String, required: true },
  message: {
    type: String,
  },

  joiningDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Placement = mongoose.model("Placement", placementSchema);
module.exports = Placement;
