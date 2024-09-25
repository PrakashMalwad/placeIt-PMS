const JobApplication = require("../models/JobApplication");

// Get all job applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching job applications', error: error.message });
    }
};

const countApplicationByUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const count = await JobApplication    .countDocuments({ postedBy: userId });
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: 'Error counting job drives: ' + error.message });
    }
  };
  
// Get a job application by student ID
const getApplicationByStudentId = async (req, res) => {
    try {
        const { id } = req.params;
        const applications = await JobApplication.find({ student: id }).populate({ 
            path: 'student', // Adjust to match your schema
            select: 'name resume' // Populate only name and resume
        });
         // Populate student name
        res.status(200).json(applications);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching job applications', error: error.message });
    }
};


// Get a job application by drive ID
// Get applications by drive ID
// Get applications by drive ID
const getApplicationByDriveId = async (req, res) => {
    try {
        const { id } = req.params;
        const applications = await JobApplication.find({ drive: id })
            .populate({ 
                path: 'student', // Adjust to match your schema
                select: 'name resume' // Populate only name and resume
            })
            
        res.status(200).json(applications);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching job applications', error: error.message });
    }
};


// Create a new job application
const createApplication = async (req, res) => {
    try {
        const {id:
            studentId
        } = req.user;
        
        const { student, drive } = req.body;

    
        // Check if an application with the same student and drive already exists
        const existingApplication = await JobApplication.findOne({ student, drive });

        if (existingApplication) {
            return res.status(400).json({ message: 'Application already exists for this student and drive' });
        }

        // Create and save the new job application
        const newApplication = new JobApplication(
            {student:studentId,...req.body});
        const savedApplication = await newApplication.save();
        
        res.status(201).json(savedApplication);
    } catch (error) {
        console.log(error.message);
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
    getApplicationByDriveId,
    countApplicationByUser,
    createApplication,
    updateApplication,
    deleteApplication
};
