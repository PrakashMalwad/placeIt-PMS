
const User = require('../models/Users/User');
const Student = require('../models/Users/Students');
const CompanyCoordinator = require('../models/Users/CompanyCoordinator');
const PlacementCoordinator = require('../models/Users/PlacementCoordinator');


// Get the logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're storing the user ID in `req.user` after authentication
    // Fetch the user profile (assumes you're using a Student model, adjust as needed)
    const profile = await User.findById(userId).populate('college'); // Populate any relations like 'college'

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the logged-in user's profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const profile = req.body;
    let updatedProfile;

    switch (user.role) {
      case 'Student':
        updatedProfile = await Student.findByIdAndUpdate(userId, profile, { new: true, runValidators: true });
        break;
      case 'CompanyCoord':
        updatedProfile = await CompanyCoordinator.findByIdAndUpdate(userId, profile, { new: true, runValidators: true });
        break;
      case 'placementcell-coordinator':
        updatedProfile = await PlacementCoordinator.findByIdAndUpdate(userId, profile, { new: true, runValidators: true });
        break;
      default:
        updatedProfile = await User.findByIdAndUpdate(userId, profile, { new: true, runValidators: true });
        break;
    }

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




