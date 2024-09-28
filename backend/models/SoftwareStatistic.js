const mongoose = require("mongoose");

const SoftwareStatisticsSchema = new mongoose.Schema({
  totalUsers: {
    type: Number,
    default: 0, // Total number of users registered in the system
  },
  totalColleges: {
    type: Number,
    default: 0, // Total number of colleges using the system
  },
  totalCompanies: {
    type: Number,
    default: 0, // Total number of companies registered
  },
  totalJobDrives: {
    type: Number,
    default: 0, // Total number of job drives conducted
  },
  totalStudentsPlaced: {
    type: Number,
    default: 0, // Total number of students placed
  },
  totalApplications: {
    type: Number,
    default: 0, // Total number of applications submitted by students
  },
  userEngagement: {
    type: Number,
    default: 0, // A metric for user engagement, could be calculated
  },
  averageResponseTime: {
    type: Number,
    default: 0, // Average response time for the application (in seconds)
  },
  errorRate: {
    type: Number,
    default: 0, // Percentage of errors encountered by users
  },
  lastUpdated: {
    type: Date,
    default: Date.now, // Timestamp for the last update
  },
});

// Automatically update engagement metrics or other calculated fields
SoftwareStatisticsSchema.pre('save', function(next) {
  // Custom logic to calculate metrics can go here
  next();
});

// Create the model
const SoftwareStatistics = mongoose.model("SoftwareStatistics", SoftwareStatisticsSchema);

module.exports = SoftwareStatistics;
