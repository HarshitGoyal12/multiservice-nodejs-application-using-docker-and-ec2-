// Import required modules
const commentModel = require('../models/commentModel');
const blogModel = require('../models/blogModel'); // To verify blog post existence

// Controller to add a new comment to a blog post
exports.addComment = async (req, res) => {
  const { post_id, content } = req.body;
  const author_id = req.user.id; // Retrieved from auth middleware

  try {
    // Validate input
    if (!post_id || !content) {
      return res.status(400).json({ error: 'post_id and content are required' });
    }

    // Check if the blog post exists
    const blog = await blogModel.getBlogById(post_id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Add comment
    const newComment = await commentModel.addComment(post_id, content, author_id);

    // Respond with the created comment
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error in addComment:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get comments for a specific blog post
exports.getComments = async (req, res) => {
  const { post_id } = req.query;

  try {
    // Validate input
    if (!post_id) {
      return res.status(400).json({ error: 'post_id is required' });
    }

    // Check if the blog post exists
    const blog = await blogModel.getBlogById(post_id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Retrieve comments
    const comments = await commentModel.getCommentsByPostId(post_id);
    res.json(comments);
  } catch (error) {
    console.error('Error in getComments:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
