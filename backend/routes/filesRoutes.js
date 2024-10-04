const express = require("express");
const router = express.Router();
const multer = require("multer");
const supabase = require("../services/subabaseclient");
const User = require("../models/Users/User");

// Initialize Multer
const upload = multer({ storage: multer.memoryStorage() });

// Upload Profile Image Route
router.post("/upload-profile", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // Upload the image to Supabase
      const { data, error } = await supabase.storage
        .from("profile-images")
        .upload(`users-img/${Date.now()}_${file.originalname}`, file.buffer, {
          contentType: file.mimetype,
        });
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      // Get the public URL of the uploaded image
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("profile-images")
        .getPublicUrl(data.path);  
  
      if (urlError) {
        return res.status(500).json({ error: urlError.message });
      }
  
      const publicURL = publicUrlData.publicUrl; // Correct extraction of public URL
      if (!publicURL) {
        return res.status(500).json({ error: "Failed to retrieve public URL" });
      }
  
      // Update the user's profile image URL in MongoDB
      const userId = req.user.id; // Ensure req.user.id is correctly set by your middleware
      console.log(userId + " " + publicURL);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profileImg: publicURL },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        message: "Image uploaded successfully",
        url: publicURL,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Retrieve User Profile
router.get("/my-profile", async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: user._id,
        profileImage: user.profileImg, 
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Upload Resume Route
router.post("/upload-resume", upload.single("file"), async (req, res) => {
  try {
      const file = req.file;
      if (!file) {
          return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload the resume to Supabase
      const { data, error } = await supabase.storage
          .from("resumes")
          .upload(`resumes/${Date.now()}_${file.originalname}`, file.buffer, {
              contentType: file.mimetype,
          });

      if (error) {
          return res.status(500).json({ error: error.message });
      }

      // Get the public URL of the uploaded resume
      const { data: publicUrlData, error: urlError } = supabase.storage
          .from("resumes")
          .getPublicUrl(data.path);

      if (urlError) {
          return res.status(500).json({ error: urlError.message });
      }

      const publicURL = publicUrlData.publicUrl;

      if (!publicURL) {
          return res.status(500).json({ error: "Failed to retrieve public URL" });
      }

      // Update the user's resume URL in MongoDB
      const userId = req.user.id;
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { resume: publicURL },
          { new: true, runValidators: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
          message: "Resume uploaded successfully",
          url: publicURL,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Upload Company or College Logo Route
router.post("/upload-logo", upload.single("file"), async (req, res) => {
  try {
      const file = req.file;
      if (!file) {
          return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload the logo to Supabase
      const { data, error } = await supabase.storage
          .from("logos")
          .upload(`logos/${Date.now()}_${file.originalname}`, file.buffer, {
              contentType: file.mimetype,
          });
console.log(error)
      if (error) {
          return res.status(500).json({ error: error.message });
      }

      // Get the public URL of the uploaded logo
      const { data: publicUrlData, error: urlError } = supabase.storage
          .from("logos")
          .getPublicUrl(data.path);
      if (urlError) {
          return res.status(500).json({ error: urlError.message });
      }

      const publicURL = publicUrlData.publicUrl;

      if (!publicURL) {
          return res.status(500).json({ error: "Failed to retrieve public URL" });
      }
      res.status(200).json({
          message: "Logo uploaded successfully",
          url: publicURL,
      });
  
  } catch (error) {
      
  }
});

router.post("/upload-mylogo", upload.single("file"), async (req, res) => {
  try {
    
      const file = req.file;
      if (!file) {
          return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload the logo to Supabase
      const { data, error } = await supabase.storage
          .from("logos")
          .upload(`logos/${Date.now()}_${file.originalname}`, file.buffer, {
              contentType: file.mimetype,
          });

      if (error) {
          return res.status(500).json({ error: error.message });
      }

      // Get the public URL of the uploaded logo
      const { data: publicUrlData, error: urlError } = supabase.storage
          .from("logos")
          .getPublicUrl(data.path);

      if (urlError) {
          return res.status(500).json({ error: urlError.message });
      }

      const publicURL = publicUrlData.publicUrl;
      if (!publicURL) {
          return res.status(500).json({ error: "Failed to retrieve public URL" });
      }

      // Update the company's or college's logo URL in MongoDB
      const entityId = req.user.id; // Assuming company/college ID is set
      const updatedEntity = await User.findByIdAndUpdate(
          entityId,
          { logo: publicURL },
          { new: true, runValidators: true }
      );

      if (!updatedEntity) {
          return res.status(404).json({ error: "Entity not found" });
      }

      res.status(200).json({
          message: "Logo uploaded successfully",
          url: publicURL,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
module.exports = router;
