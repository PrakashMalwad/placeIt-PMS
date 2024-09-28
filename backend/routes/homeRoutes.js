const express = require('express');

const College = require('../models/college');
const router = express.Router();

const { getTotalDrives } = require('../controllers/DriveController');
const { getUserCount } = require('../controllers/userController');
const { getCompanyCoordinatorCount } = require('../controllers/userController');

const { getPlacementCoordinatorCount } = require('../controllers/userController');
// Home route
router.get('/', async (req, res) => {
    res.json({
        totalDrives: await getTotalDrives(),
        companyregister: await getCompanyCoordinatorCount(),
        placementcell: await getPlacementCoordinatorCount(),
        resumes: 1000,
        dailyUsers: await getUserCount(),
    });
});
const getColleges = async () => {
    try {
      // Fetch only _id and name fields from the colleges collection
      const colleges = await College.find({}, '_id name');
      return colleges;
    } catch (error) {
      console.error("Error fetching colleges:", error);
      throw error;
    }
  };
//get colleges id and name
router.get('/colleges', async (req, res) => {
    res.json({
        colleges: await getColleges(),
    });
});



module.exports = router;