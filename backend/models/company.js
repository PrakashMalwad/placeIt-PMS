const mongoose = require('mongoose');

// Define the Company schema
const CompanySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  contactno: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Invalid contact number format'],
  },
  website: {
    type: String,
    trim: true,
  },
  aboutme: {
    type: String,
    default: null,
    trim: true,
  },
  type:{
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field before saving
CompanySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Company model
const Company = mongoose.model('Company', CompanySchema);

// Export the Company model
module.exports = Company;
