// Initialize express router
const express = require("express");
const router = express.Router();
const {
  createPlacementStatistic,
  getAllPlacementStatistics,
  getPlacementStatisticById,
  updatePlacementStatistic,
  deletePlacementStatistic,
} = require("../controllers/statsController");

// Routes for placement statistics
router.post("/", createPlacementStatistic); // Create
router.get("/", getAllPlacementStatistics); // Read all
router.get("/:id", getPlacementStatisticById); // Read one
router.put("/:id", updatePlacementStatistic); // Update
router.delete("/:id", deletePlacementStatistic); // Delete

module.exports = router;
