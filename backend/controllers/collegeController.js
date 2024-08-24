const College = require('../models/College');

// Create a new college
exports.createCollege = async (req, res) => {
    try {
        const college = new College(req.body);
        await college.save();
        res.status(201).json({ message: 'College created successfully', college });
    } catch (error) {
        res.status(400).json({ message: 'Error creating college', error });
    }
};

// Get all colleges
exports.getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find();
        res.status(200).json(colleges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching colleges', error });
    }
};

// Get a single college by ID
exports.getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching college', error });
    }
};

// Update a college by ID
exports.updateCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json({ message: 'College updated successfully', college });
    } catch (error) {
        res.status(400).json({ message: 'Error updating college', error });
    }
};

// Delete a college by ID
exports.deleteCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting college', error });
    }
};
