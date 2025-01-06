// Import required modules
const blogModel = require('../models/blogModel');

// Controller to create a new blog post
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const author_id = req.user.id; // Retrieved from auth middleware

  try {
    // Validate input
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Create blog post
    const newBlog = await blogModel.createBlog(title, content, author_id);

    // Respond with the created blog post
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error in createBlog:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get all blog posts with pagination
exports.getBlogs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Retrieve blog posts with pagination
    const blogs = await blogModel.getBlogs(limit, offset);
    res.json(blogs);
  } catch (error) {
    console.error('Error in getBlogs:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get a specific blog post by ID
exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve blog post by ID
    const blog = await blogModel.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error in getBlogById:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update a blog post by ID
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const author_id = req.user.id; // Retrieved from auth middleware

  try {
    // Check if blog post exists
    const blog = await blogModel.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if the authenticated user is the author
    if (blog.author_id !== author_id) {
      return res.status(403).json({ error: 'Unauthorized to update this blog post' });
    }

    // Update blog post
    const updatedBlog = await blogModel.updateBlog(id, title, content);

    res.json(updatedBlog);
  } catch (error) {
    console.error('Error in updateBlog:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a blog post by ID
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  const author_id = req.user.id; // Retrieved from auth middleware

  try {
    // Check if blog post exists
    const blog = await blogModel.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if the authenticated user is the author
    if (blog.author_id !== author_id) {
      return res.status(403).json({ error: 'Unauthorized to delete this blog post' });
    }

    // Delete blog post
    await blogModel.deleteBlog(id);

    // Respond with no content
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteBlog:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
