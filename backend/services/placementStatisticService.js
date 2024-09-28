const Student = require('../models/Users/Students');
const Drive = require('../models/JobDrives');
const PlacementStatistic = require('../models/PlacementStatistic');

const updatePlacementStatistics = async (collegeId) => {
  try {
    const totalStudents = await Student.countDocuments({ collegeId });
    const totalEligibleStudents = await Student.countDocuments({ collegeId, isEligible: true });
    const totalPlacedStudents = await Student.countDocuments({ collegeId, isPlaced: true });
    const totalDrives = await Drive.countDocuments({ collegeId });
    const totalCompanies = await Drive.distinct('company', { collegeId }).length;
    const placementRate = totalEligibleStudents ? (totalPlacedStudents / totalEligibleStudents) * 100 : 0;

    // Update or create the PlacementStatistic
    await PlacementStatistic.findOneAndUpdate(
      { collegeId }, // Filter by collegeId
      {
        totalStudents,
        totalEligibleStudents,
        totalPlacedStudents,
        totalDrives,
        totalCompanies,
        placementRate,
        updatedAt: Date.now()
      },
      { upsert: true } // Create a new document if one does not exist
    );

    console.log('Placement statistics updated successfully for collegeId:', collegeId);
  } catch (error) {
    console.error('Error updating placement statistics:', error);
  }
};

module.exports = { updatePlacementStatistics };
