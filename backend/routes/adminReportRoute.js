// routes/adminReport.js

const express = require('express');
const router = express.Router();
const User = require('../models/Users/User');  
const JobDrive = require('../models/JobDrives');  
const Application = require('../models/JobApplication');  
const College = require('../models/college');  
const Student = require('../models/Users/Students');

// Generate the admin report
router.get('/report', async (req, res) => {
  try {
    // 1. User Statistics
    const totalUsers = await User.countDocuments({});
    const newUsers = await User.countDocuments({ createdAt: { $gte: getStartOfPeriod() } });
    const usersByRole = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    // 2. Job Drive Statistics
    const totalJobDrives = await JobDrive.countDocuments({});
    const jobDrivesByStatus = await JobDrive.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const topJobDrives = await Application.aggregate([
      { $group: { _id: "$jobDrive", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // 3. Application Statistics
    const totalApplications = await Application.countDocuments({});
    const applicationsByStatus = await Application.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // 4. College Statistics
    const totalColleges = await College.countDocuments({});
    const collegesWithMostStudents = await User.aggregate([
        { $match: { role: "student" } },
        {
          $group: {
            _id: "$college", // Group by college ID
            count: { $sum: 1 } // Count the number of students
          }
        },
        {
          $lookup: {
            from: "colleges", 
            localField: "_id", 
            foreignField: "_id", 
            as: "collegeDetails" 
          }
        },
        {
          $unwind: "$collegeDetails" // Unwind the array to get the college details
        },
        {
          $project: {
            _id: 0, 
            collegeName: "$collegeDetails.name", // Get the college name
            studentCount: "$count" // Get the student count
          }
        },
        { $sort: { studentCount: -1 } }, // Sort by student count
        { $limit: 5 } // Limit to top 5 colleges
      ]);
      
      
      //get placedstudent
        const studentPlaced = await Student.aggregate(
            [
                { $match: { isPlaced: true } },
                { $count: "count" }
            ]
        );

    // 5. Company Engagement
    const activeCompanies = await JobDrive.aggregate([
      { $group: { _id: "$company", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Compile Report Data
    const reportData = {
      summary: {
        totalUsers, totalJobDrives, totalApplications, totalColleges
      },
      userStats: usersByRole,
      studentPlaced:studentPlaced,
      jobDriveStats: { total: totalJobDrives, byStatus: jobDrivesByStatus, topJobDrives },
      applicationStats: { total: totalApplications, byStatus: applicationsByStatus },
      collegeStats: { total: totalColleges, topColleges: collegesWithMostStudents },
      companyStats: activeCompanies
    };

    res.json(reportData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// Utility function to get the start of the report period (last 30 days)
function getStartOfPeriod() {
  let date = new Date();
  date.setDate(date.getDate() - 30); // last 30 days
  return date;
}

module.exports = router;
