const mongoose = require("mongoose");

const RequestJobDriveSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  companyCoordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduledDrive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drive",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

const RequestJobDrive = mongoose.model(
  "RequestJobDrive",
  RequestJobDriveSchema
);

module.exports = RequestJobDrive;
