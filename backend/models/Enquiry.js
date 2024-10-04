const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
  },
  collegeName: {
    type: String,
    trim: true,
  },
  enquiryType: {
    type: String,
    enum: ["college", "company", "General", "Collaboration", "Job Posting", "Connect","Feedback"],
    default: "General",
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Enquiry model
const Enquiry = mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;
