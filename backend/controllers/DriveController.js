const Drive = require('../models/JobDrives');
const winston = require('winston');

// Logger setup
const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

// Utility function for paginati
const paginate = async (model, query, page, limit) => {
  const skip = (page - 1) * limit;
  const [items, totalItems] = await Promise.all([
    model.find(query).skip(skip).limit(limit),
    model.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  return { items, totalPages };
};

// Fetch all job drives with pagination
exports.getAllDrives = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { items, totalPages } = await paginate(Drive, {}, parseInt(page), parseInt(limit));
    res.status(200).json({ items, totalPages, currentPage: parseInt(page) });
  } catch (error) {
    logger.error('Error fetching job drives:', error);
    res.status(500).json({ message: 'Error fetching job drives', error: error.message });
  }
};

// Search for job drives by title with pagination
exports.searchDrives = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = search ? { title: { $regex: search, $options: 'i' } } : {};

    const drives = await Drive.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const totalDrives = await Drive.countDocuments(query);
    const totalPages = Math.ceil(totalDrives / parseInt(limit));

    res.status(200).json({
      drives,
      totalPages,
      currentPage: parseInt(page)
    });
  } catch (error) {
    logger.error('Error searching job drives:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new job drive
exports.createDrive = async (req, res) => {
  try {
    const { company, date, location, eligibilityCriteria, jobDescription, applicationDeadline, contactPerson, contactEmail, contactPhone } = req.body;

    // Validate required fields
    if (!company || !date || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Date validation
    const today = new Date().toISOString().split('T')[0];
    if (date < today || applicationDeadline < today) {
      return res.status(400).json({ message: 'Date or application deadline must be today or a future date.' });
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contactPhone)) {
      return res.status(400).json({ message: 'Invalid phone number format.' });
    }

    const newDrive = new Drive({
      company,
      date,
      location,
      eligibilityCriteria,
      jobDescription,
      applicationDeadline,
      contactPerson,
      contactEmail,
      contactPhone
    });

    const savedDrive = await newDrive.save();
    res.status(201).json({ message: 'Job drive created successfully', drive: savedDrive });
  } catch (error) {
    logger.error('Error creating job drive:', error);
    res.status(400).json({ message: 'Error creating job drive', error: error.message });
  }
};

// Update an existing job drive
exports.updateDrive = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, date, location, eligibilityCriteria, jobDescription, applicationDeadline, contactPerson, contactEmail, contactPhone } = req.body;

    // Validate required fields
    if (!company || !date || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Date validation
    const today = new Date().toISOString().split('T')[0];
    if (date < today || applicationDeadline < today) {
      return res.status(400).json({ message: 'Date or application deadline must be today or a future date.' });
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contactPhone)) {
      return res.status(400).json({ message: 'Invalid phone number format.' });
    }

    const updatedDrive = await Drive.findByIdAndUpdate(
      id,
      {
        company,
        date,
        location,
        eligibilityCriteria,
        jobDescription,
        applicationDeadline,
        contactPerson,
        contactEmail,
        contactPhone
      },
      { new: true, runValidators: true }
    );

    if (!updatedDrive) {
      return res.status(404).json({ message: 'Job drive not found' });
    }

    res.status(200).json({ message: 'Job drive updated successfully', drive: updatedDrive });
  } catch (error) {
    logger.error('Error updating job drive:', error);
    res.status(400).json({ message: 'Error updating job drive', error: error.message });
  }
};

// Delete a job drive
exports.deleteDrive = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDrive = await Drive.findByIdAndDelete(id);

    if (!deletedDrive) {
      return res.status(404).json({ message: 'Job drive not found' });
    }

    res.status(200).json({ message: 'Job drive deleted successfully' });
  } catch (error) {
    logger.error('Error deleting job drive:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
