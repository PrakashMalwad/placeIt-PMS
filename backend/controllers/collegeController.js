const CollegeCoordinator = require('../models/Users/PlacementCoordinator');
const CollegeCode = require('../models/CollegeCodes');
const College = require('../models/college');
const User = require('../models/Users/User');


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
        const college = await CollegeCoordinator.findByIdAndDelete(req.params.id);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting college', error });
    }
};

// Helper function to generate a random 6-digit number
const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
};





exports.generateCollegeCode = async (req, res) => {
    try {
      const userId = req.user.id;

      // Fetch the user's collegeId (assuming it's stored in the User model)
      const user = await User.findById(userId).select('college');

      if (!user || !user.college) {
        return res.status(400).json({ message: 'College ID not associated with this user' });
      }
  
      const collegeId = user.college;
  
      // Check if a code already exists for this college and delete it if found
      const existingCollegeCode = await CollegeCode.findOne({ collegeid: collegeId });
      if (existingCollegeCode) {
        await CollegeCode.deleteOne({ collegeid: collegeId });
        console.log(`Deleted existing code for collegeId: ${collegeId}`);
      }
  
      // Generate a new unique code
      let code = generateRandomCode();
  
      // Ensure the new code is unique (no conflict with other colleges)
      let existingCode = await CollegeCode.findOne({ code });
      while (existingCode) {
        code = generateRandomCode();
        existingCode = await CollegeCode.findOne({ code });
      }
  
      // Create and save the new CollegeCode document
      const collegeCode = new CollegeCode({
        collegeid: collegeId,
        code: code,
      });
  
      await collegeCode.save();
  
      res.status(201).json({
        message: 'College code generated successfully',
        code: collegeCode.code,
      });
  
    } catch (error) {
      console.error('Error generating college code:', error);
      res.status(500).json({ message: 'Error generating college code', error });
    }
  };
  exports.deleteCollegeCode = async (req, res) => {
    try {
      const userId = req.user.id;

      // Fetch the user's collegeId (assuming it's stored in the User model)
      const user = await User.findById(userId).select('college');

      if (!user || !user.college) {
        return res.status(400).json({ message: 'College ID not associated with this user' });
      }
  
      const collegeId = user.college;
  
      // Delete the college code
      await CollegeCode.deleteOne({ collegeId });
      res.status(200).json({ message: 'College code deleted successfully' });
  
    } catch (error) {
      console.error('Error deleting college code:', error);
      res.status(500).json({ message: 'Error deleting college code', error });
    }
  };
  exports.getCollegeCode = async (req, res) => {
    try {
      const userId = req.user.id;

      // Fetch the user's collegeId (assuming it's stored in the User model)
      const user = await User.findById(userId).select('college');
      console.log(user.college[0])

      if (!user || !user.college) {
        return res.status(400).json({ message: 'College ID not associated with this user' });
      }
  
      const collegeId = user.college[0];
  
      // Find the college code by collegeid
      const collegeCode = await CollegeCode.findOne({ collegeId });
  
      if (!collegeCode) {
        return res.status(404).json({ message: 'College code not found' });
      }
  
      res.status(200).json({
        message: 'College code retrieved successfully',
        code: collegeCode.code,
      });
  
    } catch (error) {
      console.error('Error retrieving college code:', error);
      res.status(500).json({ message: 'Error retrieving college code', error });
    }
  };
  



