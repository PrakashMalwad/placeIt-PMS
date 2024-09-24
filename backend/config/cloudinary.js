const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles',  // Folder in Cloudinary
    format: async (req, file) => 'png',  // Set file format (jpeg, png, etc.)
    public_id: (req, file) => req.user.id,  // Unique ID for the file
  },
});

module.exports = {
  cloudinary,
  storage
};
