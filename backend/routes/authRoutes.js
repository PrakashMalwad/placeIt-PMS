const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { changePassword } = require("../controllers/userController");
const { auth } = require("../middleware/auth");

// Login route - accessible by all roles
router.post("/login", loginUser);

// Registration route - accessible by all roles
router.post("/register", registerUser);
router.put("/change-password", auth, changePassword);

module.exports = router;
