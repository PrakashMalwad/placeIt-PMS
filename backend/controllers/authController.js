require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users/User");
const Student = require("../models/Users/Students");
const PlacementCoordinator = require("../models/Users/PlacementCoordinator");
const CompanyCoordinator = require("../models/Users/CompanyCoordinator");
const Admin = require("../models/Users/admin");
const PlacementCellAdmin = require("../models/Users/PlacementCellAdmin");
const College = require("../models/college");

// Login user
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (user.role !== role) {
      return res.status(400).json({ msg: "Role does not match" });
    }

    if (user.status !== 1) {
      return res.status(400).json({ msg: "User is not verified" });
    }

    if (user.status === 0) {
      return res.status(400).json({ msg: "Your account is on hold" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
      (err, token) => {
        if (err) {
          console.error("JWT Signing Error:", err);
          return res.status(500).json({ msg: "Server error" });
        }
        res.status(200).json({
          token,
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
          },
        });
      }
    );
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).send({ msg: "Server error" });
  }
};

// Registration logic
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student", // Default to 'student' if no role is provided
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
