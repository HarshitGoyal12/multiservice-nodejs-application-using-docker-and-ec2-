// Import required modules
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new blog post (protected)
router.post('/', authMiddleware, blogController.createBlog);

// Route to get all blog posts with pagination
router.get('/', blogController.getBlogs);

// Route to get a specific blog post by ID
router.get('/:id', blogController.getBlogById);

// Route to update a blog post by ID (protected)
router.put('/:id', authMiddleware, blogController.updateBlog);

// Route to delete a blog post by ID (protected)
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
