const express = require('express');

const router = express.Router();

const { getTotalDrives } = require('../controllers/driveController');
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

module.exports = router;