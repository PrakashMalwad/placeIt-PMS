
const JobApplication = require('../models/JobApplication');
const Interview = require('../models/interview');
const Company = require('../models/company');

//get all interview
const getInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find();

        res.status(200).json({ interviews });
    } catch (error) {
        console.error('Error fetching interviews:', error);
        res.status(500).json({ message: 'Failed to fetch interviews', error });
    }
}
const scheduleInterview = async (req, res) => {
    console.log(req.params)
    const {id: applicationId } = req.params; // Extract the application ID from the request params
    const { interviewerName, date, time, location, type, link } = req.body; // Interview details including type and link

    try {
        // Find the job application by its ID
        const jobApplication = await JobApplication.findById(applicationId).populate('student','name');

        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }

        // Validate the interview type
        if (type === 'Online' && !link) {
            return res.status(400).json({ message: 'Interview link is required for online interviews' });
        }

        // Schedule an interview using the job application
        const newInterview = new Interview({
            candidateName: jobApplication.student.name, // Assuming "name" field exists on the student
            interviewerName,
            date,
            time,
            location,
            type,
            link: type === 'Online' ? link : undefined, // Only store link if it's an online interview
            jobApplication: applicationId // Link the job application to the interview
        });

        // Save the new interview
        await newInterview.save();

        res.status(201).json({ message: 'Interview scheduled successfully', interview: newInterview });
    } catch (error) {
        console.error('Error scheduling interview:', error);
        res.status(500).json({ message: 'Failed to schedule interview', error });
    }
};
//Get interview by student
const getInterviewByStudent = async (req, res) => {
    const { studentId } = req.user.id;

    try {
        const interviews = await Interview.find({ 'jobApplication.student': studentId });

        res.status(200).json({ interviews });
    } catch (error) {
        console.error('Error fetching interviews:', error);
        res.status(500).json({ message: 'Failed to fetch interviews', error });
    }
};

// get interview by company
const getInterviewByCompany = async (req, res) => {
    const { companycoordId } = req.user.id;
    //company id from companycoord id
    const companyId = await  Company.findOne({companyCoordinator:companycoordId});
    try {
        const interviews = await Interview.find({ 'jobApplication.drive': companyId });

        res.status(200).json({ interviews });
    } catch (error) {
        console.error('Error fetching interviews:', error);
        res.status(500).json({ message: 'Failed to fetch interviews', error });
    }
};
//delete only is role is admin or company
const deleteInterview = async (req, res) => {
    
    const { id } = req.params;

    try {
        const interview = await Interview.findByIdAndDelete(id);

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        res.status(200).json({ message: 'Interview deleted' });
    } catch (error) {
        console.error('Error deleting interview:', error);
        res.status(500).json({ message: 'Failed to delete interview', error });
    }
};
//update interview
const updateInterview = async (req, res) => {
    const { id } = req.params;
    const { ...other } = req.body;

    try {
        const interview = await Interview.findByIdAndUpdate(id, { ...other}, { new: true });

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        res.status(200).json({ message: 'Interview updated', interview });
    } catch (error) {
        console.error('Error updating interview:', error);
        res.status(500).json({ message: 'Failed to update interview', error });
    }
};

module.exports = {
    scheduleInterview,
    getInterviews,
    getInterviewByStudent,
    deleteInterview,
    updateInterview,
    getInterviewByCompany
};
