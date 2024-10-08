const mongoose = require("mongoose");
const User = require("./User");

const companyCoordinatorSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    required: false,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  department: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  pincode: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
}); // No timestamps option here

// Create a discriminator for `company-coordinator`
const CompanyCoordinator = User.discriminator(
  "company-coordinator",
  companyCoordinatorSchema
);

module.exports = CompanyCoordinator;
