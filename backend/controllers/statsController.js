// controllers/placementStatisticController.js

const PlacementStatistic = require('../models/PlacementStatistic');

// Create a new placement statistic
const createPlacementStatistic = async (req, res) => {
  try {
    const statistic = new PlacementStatistic(req.body);
    await statistic.save();
    res.status(201).json(statistic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all placement statistics
const getAllPlacementStatistics = async (req, res) => {
  try {
    const statistics = await PlacementStatistic.find().populate('collegeId', 'name'); // Populate college name
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single placement statistic by ID
const getPlacementStatisticById = async (req, res) => {
  try {
    const statistic = await PlacementStatistic.findById(req.params.id).populate('collegeId', 'name');
    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    res.status(200).json(statistic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a placement statistic by ID
const updatePlacementStatistic = async (req, res) => {
  try {
    const statistic = await PlacementStatistic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    res.status(200).json(statistic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a placement statistic by ID
const deletePlacementStatistic = async (req, res) => {
  try {
    const statistic = await PlacementStatistic.findByIdAndDelete(req.params.id);
    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlacementStatistic,
  getAllPlacementStatistics,
  getPlacementStatisticById,
  updatePlacementStatistic,
  deletePlacementStatistic,
};
