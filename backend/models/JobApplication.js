const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
  studentResume: { type: String },
  drive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobDrive",
    required: true,
  },
  status: { type: String, required: true },
  appliedDate: { type: Date, required: true },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
