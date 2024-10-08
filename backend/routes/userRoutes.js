// routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

// User management routes
router.get("/me", userController.getUserByIdme);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/mycollege/:id", userController.getCollegeByUserId);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.holdUnholdUser);
router.patch("/v/:id", userController.verifyuser);

module.exports = router;
