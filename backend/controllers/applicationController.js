const JobApplication = require("../models/JobApplication");

// Get all job applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find().populate("student drive");
        res.status(200).json(applications);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching job applications', error: error.message });
    }
};

// Get a job application by student ID
const getApplicationByStudentId = async (req, res) => {
    try {
        const { id } = req.params;
        const applications = await JobApplication.find({ student: id }).populate("student drive");
        res.status(200).json(applications);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching job applications', error: error.message });
    }
};

// Create a new job application
const createApplication = async (req, res) => {
    try {
        const newApplication = new JobApplication(req.body);
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error creating job application', error: error.message });
    }
};

// Update an existing job application (e.g., Withdraw)
const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedApplication = await JobApplication.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error updating job application', error: error.message });
    }
};

// Delete a job application
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedApplication = await JobApplication.findByIdAndDelete(id);
        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting job application', error: error.message });
    }
};

module.exports = {
    getAllApplications,
    getApplicationByStudentId,
    createApplication,
    updateApplication,
    deleteApplication
};
