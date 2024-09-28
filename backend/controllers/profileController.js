
const User = require('../models/Users/User');
const Student = require('../models/Users/Students');

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
    const userId = req.user.id; // Assuming you're storing the user ID in `req.user`
    const {
      ...other
    } = req.body;

    // Find and update the user's profile
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      {
        ...other
      },
      { new: true, runValidators: true } // Return the updated document and validate input
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



