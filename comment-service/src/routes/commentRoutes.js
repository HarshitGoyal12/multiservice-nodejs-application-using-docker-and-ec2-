// Import required modules
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to add a new comment to a blog post (protected)
router.post('/', authMiddleware, commentController.addComment);

// Route to get comments for a specific blog post
router.get('/', commentController.getComments);

module.exports = router;
