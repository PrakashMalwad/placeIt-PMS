const mongoose = require('mongoose');
const User = require('./User');
const bcrypt = require('bcryptjs');

// Define the Company schema
const CompanySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
  },
  aboutme: {
    type: String,
    default: null,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Number,
    enum: [0, 1, 2],
    default: 2,
  },
});

// Pre-save hook to hash the password before saving
CompanySchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Create the Company model as a discriminator of User
const Company = User.discriminator('Company', CompanySchema);

module.exports = Company;
