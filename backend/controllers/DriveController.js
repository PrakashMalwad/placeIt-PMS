
const Drive = require("../models/JobDrives");
const winston = require("winston");
const Student = require("../models/Users/Students");

// Logger setup
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// Get drive posted by me
const getDrivePostedByMe = async (req, res) => {
  const { id: userId } = req.user;
  console.log("User object:", req.user);
  const drive = await Drive.find({ postedBy: userId });
  if (!drive) {
    return res.status(404).json({ message: "Drive not found" });
  }
  s;
  res.json(drive);
};

const getDriveByCollege = async (req, res) => {
  const { id } = req.params;
  const drive = await Drive.findOne({ where: { college_id: id } });
  if (!drive) {
    return res.status(404).json({ message: "Drive not found" });
  }
  res.json(drive);
};

const getDriveByStudentCollege = async (req, res) => {
  const { id: userId } = req.user;

  try {
    // Find the student by userId to get their college
    const student = await Student.findOne({ _id: userId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const studentCollegeId = student.college;
console.log(studentCollegeId)
    // Find drives where the postedBy's college matches the student's college
    const drives = await Drive.find({ 'postedBy.college': studentCollegeId }).populate('postedBy', 'college');
    console.log(drives)

    if (!drives || drives.length === 0) {
      return res.status(404).json({ message: "Drives not found for this college" });
    }

    res.json(drives);
  } catch (error) {
    console.error("Error fetching drives:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}



// get total drive
const getTotalDrives = async () => {
  try {
    return await Drive.countDocuments();
  } catch (error) {
    console.error(`Error counting drives: ${error.message}`);
    return 0;
  }
};

// Utility function for pagination with populate
const paginate = async (model, query, page, limit, populateOptions = "",populateOptions2= "") => {
  const skip = (page - 1) * limit;
  const [results, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit).populate(populateOptions).populate(populateOptions2),
    model.countDocuments(query),
  ]);
  return {
    results,
    totalPages: Math.ceil(total / limit),
  };
};
const countJobDrivesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await Drive.countDocuments({ postedBy: userId });
    res.json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting job drives: " + error.message });
  }
};

// Fetch drives with pagination, search, and populate
const getAllDrives = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const query = search ? { company: { $regex: search, $options: "i" } } : {};
    const populateOptions = { path: "postedBy", select: "name email" ,};
    const populateOptions2 = { path: "company", select: "companyname" };
    const { results, totalPages } = await paginate(
      Drive,
      query,
      +page,
      +limit,
      populateOptions,
      populateOptions2
    );

    res.json({ drives: results, totalPages });
  } catch (error) {
    logger.error(`Error fetching drives: ${error.message}`);
    res.status(500).json({ message: "Error fetching job drives" });
  }
};

// Create a new job drive
const createDrive = async (req, res) => {
  const { id: userId } = req.user;
  const {

    company,
    jobtitle,
    date,
    location,
    eligibilityCriteria,
    jobDescription,
    applicationDeadline,
    contactPerson,
    contactEmail,
    contactPhone,
    postedBy,
  } = req.body;

  try {
    const newDrive = new Drive({
      jobtitle,
      company,
      date,
      location,
      eligibilityCriteria,
      jobDescription,
      applicationDeadline,
      contactPerson,
      contactEmail,
      contactPhone,
      postedBy: userId,
    });

    await newDrive.save();
    res.status(201).json(newDrive);
  } catch (error) {
    logger.error(`Error creating drive: ${error.message}`);
    res.status(500).json({ message: "Error creating job drive" });
  }
};

// Get drive by Id
const getDriveById = async (req, res) => {
  const { id } = req.params;

  try {
    const drive = await Drive.findById(id).populate("company","companyname");
    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }
    res.json(drive);
  } catch (error) {
    logger.error(`Error fetching drive: ${error.message}`);
    res.status(500).json({ message: "Error fetching job drive" });
  }
};

const getDriveByUser = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1; // Get the page number from query, default to 1
  const limit = parseInt(req.query.limit) || 10; // Get the limit from query, default to 10

  try {
    // Use the paginate utility function
    const populateOptions = { path: "postedBy", select: "name email" ,};
    const populateOptions2 = { path: "company", select: "companyname" };
    const { results: drives, totalPages } = await paginate(
      Drive,
      { postedBy: id },
      page,
      limit,
      populateOptions,
      populateOptions2
    );

    if (!drives || drives.length === 0) {
      return res.status(404).json({ message: "Drive not found" });
    }

    res.json({
      drives,
      totalPages, // Total pages from pagination utility
      currentPage: page, // Current page number
    });
  } catch (error) {
    logger.error(`Error fetching drives: ${error.message}`);
    res.status(500).json({ message: "Error fetching job drives" });
  }
};

// Update an existing job drive
const updateDrive = async (req, res) => {
  const { id } = req.params;
  const { id: userID } = req.user;
  const {
    company,
    date,
    location,
    eligibilityCriteria,
    jobDescription,
    applicationDeadline,
    contactPerson,
    contactEmail,
    contactPhone,
  } = req.body;

  try {
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
        contactPhone,
        postedBy: userID,
      },
      { new: true }
    );
    if (!updatedDrive) {
      return res.status(404).json({ message: "Drive not found" });
    }
    res.json(updatedDrive);
  } catch (error) {
    logger.error(`Error updating drive: ${error.message}`);
    res.status(500).json({ message: "Error updating job drive" });
  }
};

// Delete a job drive
const deleteDrive = async (req, res) => {
  const { id } = req.params;
  try {
    const drive = await Drive.findByIdAndDelete(id);
    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }
    res.json({ message: "Drive deleted" });
  } catch (error) {
    logger.error(`Error deleting drive: ${error.message}`);
    res.status(500).json({ message: "Error deleting job drive" });
  }
};

module.exports = {
  getAllDrives,
  getDrivePostedByMe,
  getDriveById,
  getDriveByUser,
  createDrive,
  updateDrive,
  getDriveByStudentCollege,
  deleteDrive,
  countJobDrivesByUser,
  getDriveByCollege,
  getTotalDrives,
};
