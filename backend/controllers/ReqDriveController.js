const PlacementCoordinator = require("../models/Users/PlacementCoordinator");
const RequestJobDrive = require("../models/RequestJobDrive");
const CompanyCoordinator = require("../models/Users/CompanyCoordinator");
// Create Reqdrive
const createReqDrive = async (req, res) => {
  const { id: userId } = req.user;
  const {
    jobTitle,
    jobDescription,
    requirements,
    applicationDeadline,
    salary,
    college,
  } = req.body;

  try {
    // Fetch the company based on the logged-in user
    const user = await CompanyCoordinator.findById(userId).populate("company");

    if (!user || !user.company) {
      return res
        .status(404)
        .json({ message: "Company not found for the user" });
    }

    // Create a new RequestJobDrive instance
    const newDrive = new RequestJobDrive({
      jobTitle,
      jobDescription,
      requirements,
      applicationDeadline,
      salary,
      college,
      company: user.company._id,
      companyCoordinator: userId,
    });

    // Save the new drive to the database
    await newDrive.save();

    // Respond with the newly created drive
    res.status(201).json(newDrive);
  } catch (error) {
    // Log the error and send an error response
    console.error(`Error creating drive: ${error.message}`);
    res.status(500).json({ message: "Error creating job drive" });
  }
};

const getReqDriveByCollege = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await PlacementCoordinator.findById(userId).populate(
      "college",
      "id"
    );

    if (!user || !user.college) {
      return res
        .status(400)
        .json({ message: "User's college information not found" });
    }
    const collegeId = user.college.id;
    const jobDrives = await RequestJobDrive.find({
      college: collegeId,
    }).populate("company", "companyname state city");

    if (!jobDrives.length) {
      return res
        .status(404)
        .json({ message: "No job drives found for this college" });
    }

    res.status(200).json(jobDrives);
  } catch (error) {
    console.error("Error fetching job drives:", error.message);
    res.status(500).json({ message: "Error retrieving job drives" });
  }
};


const changeReqDriveStatus = async (req, res) => {
    const { reqdrive,status } = req.body; 
    try {
      const validStatuses = ["pending", "accepted", "rejected"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status provided." });
      }
      const updatedRequest = await RequestJobDrive.findByIdAndUpdate(
        reqdrive,
        { status },
        { new: true }
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ message: "Request not found." });
      }
      res.status(200).json(updatedRequest);
    } catch (error) {
      console.error("Error updating request status:", error.message);
      res.status(500).json({ message: "Error updating request status." });
    }
  };
  

// add schelduledDrive as drive id provided

const addScheduledDrive = async (req, res) => {
      const { reqdrive, drive } = req.body;
      try {
        const updatedRequest = await RequestJobDrive.findByIdAndUpdate(
            reqdrive,
            { scheduledDrive: drive },
            { new: true }
            );
        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found." });
        }
        res.status(200).json(updatedRequest);
    }
    catch (error) {
        console.error("Error updating request status:", error.message);
        res.status(500).json({ message: "Error updating request status." });
    }
};
// Delete drive
const deleteReqDrive = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDrive = await RequestJobDrive.findByIdAndDelete(id);
    if (!deletedDrive) {
      return res.status(404).json({ message: "Drive not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting drive:", error.message);
    res.status(500).json({ message: "Error deleting drive" });
  }
};
// get RequestDrive
const getReqDrivebyCompany = async (req, res) => {
  const { id:userId} = req.user;
  const user = await CompanyCoordinator.findById(userId).populate("company");
  if (!user || !user.company) {
    return res.status(404).json({ message: "Company not found for the user" });
  }
  const id = user.company._id;
  const reqDrive = (await RequestJobDrive.find({ company: id }).populate('college','name'));
  if (!reqDrive) {
    return res.status(404).json({ message: "Drive not found" });
  }
  res.json(reqDrive);
};

module.exports = { 
    createReqDrive,
    getReqDriveByCollege,
    getReqDrivebyCompany,
    changeReqDriveStatus,
    deleteReqDrive,
    addScheduledDrive,
};
