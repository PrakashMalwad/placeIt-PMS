const User = require('../models/Users/User'); 
const { body, validationResult } = require('express-validator'); // For validation

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users: ' + err.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user: ' + err.message });
  }
};

// Create a new user
exports.createUser = [
  // Validation and sanitization
  body('name').notEmpty().withMessage('Name is r    equired'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: 'Error creating user: ' + err.message });
    }
  },
];

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user: ' + err.message });
  }
};
exports.deleteUser = async (req, res) => {
    try {
      const result = await User.findByIdAndDelete(req.params.id);
      if (!result) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user: ' + err.message });
    }
  };
  
  
// Toggle hold/unhold a user
exports.holdUnholdUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = user.status === 0 ? 1 : 0; // Toggle between hold (0) and active (1)
    await user.save();
    res.json({ message: `User status changed to ${user.status === 0 ? 'Hold' : 'Active'}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Error toggling user status: ' + err.message });
  }
};

// Verify a user (set status to 1 if not already)
exports.verifyuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.status === 2) {
      user.status = 1; // Verify user
      await user.save();
      res.json({ message: 'User is now active', user });
    } else {
      res.json({ message: 'User is already verified or active' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error verifying user: ' + err.message });
  }
};
