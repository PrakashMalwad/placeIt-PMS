const mongoose = require('mongoose');
const User = require('./User');
const bcrypt = require('bcryptjs');

// Define the Company schema
const CompanySchema = new mongoose.Schema({
  companyname: {
    type: String,
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
  logo: {
    type: String,
    trim: true,
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
