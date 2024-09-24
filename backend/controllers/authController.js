require('dotenv').config();
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
    const { role, email, password, cpassword, college, subrole, ...otherData } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        if (password !== cpassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let collegeId;
        if (college) {
            if (mongoose.Types.ObjectId.isValid(college)) {
                const existingCollege = await College.findById(college);
                if (!existingCollege) {
                    return res.status(400).json({ msg: "Invalid college ID" });
                }
                collegeId = existingCollege._id;
            } else {
                return res.status(400).json({ msg: "Invalid college ID format" });
            }
        }

        let user;

        switch (role) {
            case 'student':
                user = new Student({
                    ...otherData,
                    email,
                    password: hashedPassword,
                    college: collegeId,
                    role,
                });
                break;

            case 'placementcell-coordinator':
                user = new PlacementCoordinator({
                    ...otherData,
                    email,
                    password: hashedPassword,
                    college: collegeId,
                    role,
                });
                break;

            case 'company-coordinator':
                user = new CompanyCoordinator({
                    ...otherData,
                    email,
                    password: hashedPassword,
                    role,
                });
                break;

            case 'admin':
                user = new Admin({
                    ...otherData,
                    email,
                    password: hashedPassword,
                    subrole: subrole || 'admin',
                    role,
                });
                break;

            case 'placementcell-admin':
                user = new PlacementCellAdmin({
                    ...otherData,
                    email,
                    password: hashedPassword,
                    college: collegeId,
                    role,
                });
                break;

            default:
                return res.status(400).json({ msg: "Invalid role" });
        }

        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role, subrole: user.subrole },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.status(201).json({ token, user: { id: user._id, role: user.role, subrole: user.subrole || null } });
    } catch (err) {
        console.error("Error registering user:", err.message);
        res.status(500).json({ msg: "Server error" });
    }
};
