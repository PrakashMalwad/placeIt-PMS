// controllers/profileController.js
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const User = require('../models/Users/User');

const upload = multer({ storage }).single('profileImage');


// Upload profile image to Cloudinary
exports.uploadProfileImage = (req, res) => {
  const userId = req.params.id; // Get user ID from the route parameter

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: 'File upload failed', error: err });
    }

    // Save the Cloudinary URL in MongoDB with user ID
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.profileImage = req.file.path;  // Store the Cloudinary URL
        user.save()
          .then(() => res.json({ success: true, profileImage: user.profileImage }))
          .catch(err => res.status(500).json({ success: false, message: 'Error saving profile image', error: err }));
      })
      .catch(err => res.status(500).json({ success: false, message: 'Error finding user', error: err }));
  });
};

// Get User Profile Image
exports.getProfileImage = (req, res) => {
  const userId = req.params.id; // Get user ID from the route parameter

  User.findById(userId)
    .then(user => {
      if (!user || !user.profileImage) {
        return res.status(404).json({ success: false, message: 'User or profile image not found' });
      }
      res.json({ success: true, profileImage: user.profileImage });
    })
    .catch(err => res.status(500).json({ success: false, message: 'Error fetching user', error: err }));
};
