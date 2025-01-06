// Import required modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to register a new user
router.post('/register', userController.register);

// Route to authenticate a user and provide JWT
router.post('/login', userController.login);

// Route to get user details (protected)
router.get('/:id', authMiddleware, userController.getUser);

// Route to update user details (protected)
router.put('/:id', authMiddleware, userController.updateUser);

// Route to delete a user (protected)
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;