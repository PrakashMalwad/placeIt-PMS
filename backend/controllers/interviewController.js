const JobApplication = require("../models/JobApplication");
const Interview = require("../models/interview");
const Company = require("../models/company");
const Student = require("../models/Users/Students");
const CompanyCoordinator = require("../models/Users/CompanyCoordinator");
const Placement = require("../models/placement");

//get all interview
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json({ interviews });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ message: "Failed to fetch interviews", error });
  }
};
//count interview
const countInterviewStudent = async (req, res) => {
  const studentId = req.user.id;
  try {
    const interviews = await Interview.find().populate({
      path: "jobApplication",
      match: { student: studentId },
      select: "student",
    });

    const filteredInterviews = interviews.filter(
      (interview) => interview.jobApplication
    );

    if (filteredInterviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No interviews found for this student." });
    }

    res.status(200).json({ count: filteredInterviews.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting interviews: " + error.message });
  }
};
// controller for selecting candidate
const selectCandidateById = async (req, res) => {
  const { id } = req.params; // Get the job application ID

  try {
    // Fetch the job application to get the student ID
    const jobApplication = await JobApplication.findById(id);
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    const studentId = jobApplication.student; // Extract the student ID

    // Get company ID through user ID
    const companycoordId = req.user.id;
    const companyData = await CompanyCoordinator.findById(
      companycoordId
    ).select("company");

    if (!companyData) {
      return res.status(404).json({ message: "Company Coordinator not found" });
    }

    const companyId = companyData.company;

    // Assume you have these values available from the request body
    const { jobTitle, message, package, location, joiningDate } = req.body;

    // Validate input data
    if (!jobTitle || !message || !package || !location || !joiningDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing placement for the student
    const existingPlacement = await Placement.findOne({ student: studentId });

    if (existingPlacement) {
      // If there's an existing placement
      if (existingPlacement.placedCompany.toString() === companyId.toString()) {
        // If it's the same company, update the existing record
        existingPlacement.jobTitle = jobTitle;
        existingPlacement.message = message;
        existingPlacement.package = package;
        existingPlacement.location = location;
        existingPlacement.joiningDate = joiningDate;

        await existingPlacement.save();

        return res.status(200).json({
          message: "Candidate updated successfully",
          placement: existingPlacement,
        });
      } else {
        // If it's a different company
        return res.status(400).json({
          message: "Candidate is already placed with a different company",
        });
      }
    }

    // Create a new placement record since there's no existing one
    const placement = new Placement({
      student: studentId,
      placedCompany: companyId,
      jobTitle,
      package,
      message,
      location,
      joiningDate,
    });

    await placement.save();

    // Update the user to mark them as placed
    const user = await Student.findByIdAndUpdate(
      studentId,
      { isPlaced: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Candidate selected", user, placement });
  } catch (error) {
    console.error("Error selecting candidate:", error);
    res.status(500).json({ message: "Failed to select candidate", error });
  }
};

const scheduleInterview = async (req, res) => {
  console.log(req.params);
  const { id: applicationId } = req.params;
  const { interviewerName, date, time, location, type, link } = req.body; 

  try {
    // Find the job application by its ID
    const jobApplication = await JobApplication.findById(
      applicationId
    ).populate("student", "name");

    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Validate the interview type
    if (type === "Online" && !link) {
      return res
        .status(400)
        .json({ message: "Interview link is required for online interviews" });
    }

    // Schedule an interview using the job application
    const newInterview = new Interview({
      candidateName: jobApplication.student.name,
      interviewerId: req.user.id,
      interviewerName,
      date,
      time,
      location,
      type,
      link: type === "Online" ? link : undefined, // Only store link if it's an online interview
      jobApplication: applicationId, // Link the job application to the interview
    });

    // Save the new interview
    await newInterview.save();

    res.status(201).json({
      message: "Interview scheduled successfully",
      interview: newInterview,
    });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Failed to schedule interview", error });
  }
};
//Get interview by student
const getInterviewByStudent = async (req, res) => {
  const studentId = req.user.id;

  try {
    const interviews = await Interview.find().populate({
      path: "jobApplication",
      match: { student: studentId },
      select: "student",
    });

    const filteredInterviews = interviews.filter(
      (interview) => interview.jobApplication
    );

    if (filteredInterviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No interviews found for this student." });
    }

    res.status(200).json({ interviews: filteredInterviews });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ message: "Failed to fetch interviews" });
  }
};

// get interview by company
const getInterviewByCompany = async (req, res) => {
  const { companycoordId } = req.user.id;
  //company id from companycoord id
  const companyId = await Company.findOne({
    companyCoordinator: companycoordId,
  });
  try {
    const interviews = await Interview.find({
      "jobApplication.drive": companyId,
    });

    res.status(200).json({ interviews });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ message: "Failed to fetch interviews", error });
  }
};
//delete only is role is admin or company
const deleteInterview = async (req, res) => {
  const { id } = req.params;

  try {
    const interview = await Interview.findByIdAndDelete(id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.status(200).json({ message: "Interview deleted" });
  } catch (error) {
    console.error("Error deleting interview:", error);
    res.status(500).json({ message: "Failed to delete interview", error });
  }
};
//update interview
const updateInterview = async (req, res) => {
  const { id } = req.params;
  const { ...other } = req.body;

  try {
    const interview = await Interview.findByIdAndUpdate(
      id,
      { ...other },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.status(200).json({ message: "Interview updated", interview });
  } catch (error) {
    console.error("Error updating interview:", error);
    res.status(500).json({ message: "Failed to update interview", error });
  }
};

module.exports = {
  scheduleInterview,
  getInterviews,
  getInterviewByStudent,
  deleteInterview,
  selectCandidateById,
  updateInterview,
  countInterviewStudent,
  getInterviewByCompany,
};
