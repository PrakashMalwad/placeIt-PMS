const Student = require('../models/Users/Students');
const Drive = require('../models/JobDrives');
const PlacementStatistic = require('../models/PlacementStatistic');
const PlacementCoordinator = require('../models/Users/PlacementCoordinator');

const updatePlacementStatistics = async (collegeId) => {
  try {
    // Count students and their placement status
    const totalStudents = await Student.countDocuments({ college: collegeId }); 
    const totalEligibleStudents = await Student.countDocuments({ college: collegeId, isEligible: true });
    const totalPlacedStudents = await Student.countDocuments({ college: collegeId, isPlaced: true });

    // Get placement coordinator by college ID
    const placementCoordinator = await PlacementCoordinator.findOne({ college: collegeId });
    
    // Check if the placement coordinator exists
    if (!placementCoordinator) {
      console.error(`Placement Coordinator not found for collegeId: ${collegeId}`);
      return;
    }
    
    const coordinatorId = placementCoordinator._id;

    // Count job drives posted by the coordinator
    const totalDrives = await Drive.countDocuments({ postedBy: { $in: [coordinatorId] } });

    // Get distinct companies that have posted drives
    const distinctCompanies = await Drive.distinct('company', { collegeId }); 
    const totalCompanies = distinctCompanies.length;

    // Calculate placement rate
    const placementRate = totalEligibleStudents ? (totalPlacedStudents / totalEligibleStudents) * 100 : 0;

    // Update or create the PlacementStatistic document
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
      { upsert: true } // Create if doesn't exist
    );

    console.log('Placement statistics updated successfully for collegeId:', collegeId);
  } catch (error) {
    console.error('Error updating placement statistics:', error);
  }
};

module.exports = { updatePlacementStatistics };
