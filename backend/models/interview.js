const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interviewerName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  link: {
    type: String, // This will store the meeting link (e.g., Zoom/Google Meet) if the interview is online
    validate: {
      validator: function (v) {
        return this.type === "Online" ? v && v.startsWith("http") : true; // Only validate link if interview is online
      },
      message: (props) =>
        `Invalid URL format for interview link: ${props.value}`,
    },
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  selected: {
    type: Boolean,
    default: false,
  },
  feedback: {
    type: String,
  },
  jobApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobApplication",
    required: true,
  },
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
