// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js'); 
const profileController = require('../controllers/profileController.js'); 

// User management routes
router.get('/me', userController.getUserByIdme);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/mycollege/:id',userController.getCollegeByUserId)
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.holdUnholdUser);
router.patch('/v/:id', userController.verifyuser);

// Profile image routes with user ID as a parameter
router.post('/uploadProfileImage/:id', profileController.uploadProfileImage);
router.get('/profileImage/:id', profileController.getProfileImage); 

module.exports = router;
