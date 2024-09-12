const Drive = require('../models/JobDrives');
const winston = require('winston');

// Logger setup
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// Utility function for pagination
const paginate = async (model, query, page, limit) => {
  const skip = (page - 1) * limit;
  const [results, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit),
    model.countDocuments(query),
  ]);
  return {
    results,
    totalPages: Math.ceil(total / limit),
  };
};

// Fetch drives with pagination and search
const getAllDrives = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  try {
    const query = search ? { company: { $regex: search, $options: 'i' } } : {};
    const { results, totalPages } = await paginate(Drive, query, +page, +limit);
    res.json({ drives: results, totalPages });
  } catch (error) {
    logger.error(`Error fetching drives: ${error.message}`);
    res.status(500).json({ message: 'Error fetching job drives' });
  }
};

// Create a new job drive
const createDrive = async (req, res) => {
  const { company, date, location, eligibilityCriteria, jobDescription, applicationDeadline, contactPerson, contactEmail, contactPhone } = req.body;
  
  try {
    const newDrive = new Drive({ company, date, location, eligibilityCriteria, jobDescription, applicationDeadline, contactPerson, contactEmail, contactPhone });
    await newDrive.save();
    res.status(201).json(newDrive);
  } catch (error) {
    logger.error(`Error creating drive: ${error.message}`);
    res.status(500).json({ message: 'Error creating job drive' });
  }
};
// Get drive by Id
const getDriveById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const drive = await Drive.findById(id);
    if
    (!drive) {
      return res.status(404).json({ message: 'Drive not found' });
    }
    res.json(drive);
    } catch (error) {
    logger.error(`Error fetching drive: ${error.message}`);
    res.status(500).json({ message: 'Error fetching job drive' });
    }
    };

// Update an existing job drive
const updateDrive = async (req, res) => {
  const { id } = req.params;
  const { company, date, location, eligibilityCriteria, jobDescription, applicationDeadline, contactPerson, contactEmail, contactPhone } = req.body;

  try {
    const updatedDrive = await Drive.findByIdAndUpdate(id, { company, date, location, eligibilityCriteria, jobDescription, applicationDeadline, contactPerson, contactEmail, contactPhone }, { new: true });
    if (!updatedDrive) {
      return res.status(404).json({ message: 'Drive not found' });
    }
    res.json(updatedDrive);
  } catch (error) {
    logger.error(`Error updating drive: ${error.message}`);
    res.status(500).json({ message: 'Error updating job drive' });
  }
};

// Delete a job drive
const deleteDrive = async (req, res) => {
  const { id } = req.params;
  try {
    const drive = await Drive.findByIdAndDelete(id);
    if (!drive) {
      return res.status(404).json({ message: 'Drive not found' });
    }
    res.json({ message: 'Drive deleted' });
  } catch (error) {
    logger.error(`Error deleting drive: ${error.message}`);
    res.status(500).json({ message: 'Error deleting job drive' });
  }
};

module.exports = {
  getAllDrives,
  getDriveById,
  createDrive,
  updateDrive,
  deleteDrive
};
