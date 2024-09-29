const mongoose = require('mongoose');

const CollegeCodeSchema = new mongoose.Schema({
  collegeid: { type: String, required: true },
  code: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('CollegeCode', CollegeCodeSchema);
