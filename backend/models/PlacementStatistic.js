const mongoose = require("mongoose");

const placementStatisticSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  totalStudents: { type: Number, required: true },
  totalEligibleStudents: { type: Number, required: true },
  totalPlacedStudents: { type: Number, required: true },
  totalDrives: { type: Number, required: true },
  totalCompanies: { type: Number, required: true },
  placementRate: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PlacementStatistic", placementStatisticSchema);
