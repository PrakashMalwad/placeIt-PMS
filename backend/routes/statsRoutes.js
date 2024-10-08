// Initialize express router
const express = require("express");
const router = express.Router();
const Placement = require("../models/placement");
const {
  createPlacementStatistic,
  getAllPlacementStatistics,
  getPlacementStatisticById,
  getPlacementStatisticByCollegeId,
  updatePlacementStatistic,
  deletePlacementStatistic,
} = require("../controllers/statsController");

// Routes for placement statistics
router.post("/", createPlacementStatistic); 
router.get("/", getAllPlacementStatistics); 
router.get("/bycollege/",getPlacementStatisticByCollegeId ); 
router.get("/get/:id", getPlacementStatisticById); 
router.put("/:id", updatePlacementStatistic); 
router.delete("/:id", deletePlacementStatistic); 


module.exports = router;
