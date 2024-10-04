const Student = require('../models/Users/Students');
const Drive = require('../models/JobDrives');
const PlacementStatistic = require('../models/PlacementStatistic');
const User = require('../models/Users/User');

const updatePlacementStatistics = async (collegeId) => {
  try {
    const totalStudents = await Student.countDocuments({ college: collegeId }); 
    const totalEligibleStudents = await Student.countDocuments({ college: collegeId, isEligible: true });
    const totalPlacedStudents = await Student.countDocuments({ college: collegeId, isPlaced: true });
    const totalDrives = await Drive.countDocuments({ collegeId });
    
    const distinctCompanies = await Drive.distinct('company', { collegeId }); 
    const totalCompanies = distinctCompanies.length;

    const placementRate = totalEligibleStudents ? (totalPlacedStudents / totalEligibleStudents) * 100 : 0;

    // Update or create the PlacementStatistic
    await PlacementStatistic.findOneAndUpdate(
      { collegeId }, 
      {
        totalStudents,
        totalEligibleStudents,
        totalPlacedStudents,
        totalDrives,
        totalCompanies,
        placementRate,
        updatedAt: Date.now(),
      },
      { upsert: true } // Create a new document if one does not exist
    );

    console.log('Placement statistics updated successfully for collegeId:', collegeId);
  } catch (error) {
    console.error('Error updating placement statistics:', error);
  }
};

module.exports = { updatePlacementStatistics };
