const User = require("../models/Users/User");
const Student = require("../models/Users/Students");
const CompanyCoordinator = require("../models/Users/CompanyCoordinator");
const PlacementCoordinator = require("../models/Users/PlacementCoordinator");

// Get the logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch the user profile
    const profile = await User.findById(userId)
      .populate("college")
      .populate("company", "companyname");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update the logged-in user's profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      user: { id: userId },
      body: profile,
    } = req; // Destructuring userId and profile from req

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedProfile;

    switch (user.role) {
      case "student":
        updatedProfile = await Student.findByIdAndUpdate(userId, profile, {
          new: true,
          runValidators: true,
        });
        break;
      case "company-coordinator":
        updatedProfile = await CompanyCoordinator.findByIdAndUpdate(
          userId,
          profile,
          { new: true, runValidators: true }
        );
        break;
      case "placementcell-coordinator":
        updatedProfile = await PlacementCoordinator.findByIdAndUpdate(
          userId,
          profile,
          { new: true, runValidators: true }
        );
        break;
      case "admin":
        updatedProfile = await Admin.findByIdAndUpdate(userId, profile, {
          new: true,
          runValidators: true,
        });
        break;
      case "default-user":
        updatedProfile = await User.findByIdAndUpdate(userId, profile, {
          new: true,
          runValidators: true,
        });
        break;
      default:
        return res.status(400).json({ message: "Invalid user role" });
    }

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ message: "Profile not found or not updated" });
    }

    return res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
