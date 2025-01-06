// Import required modules
const { Pool } = require('pg');

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to create a new blog post
exports.createBlog = async (title, content, author_id) => {
  const res = await pool.query(
    'INSERT INTO blogs.blogs (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, author_id]
  );
  return res.rows[0];
};

// Function to get all blog posts with pagination
exports.getBlogs = async (limit, offset) => {
  const res = await pool.query(
    'SELECT * FROM blogs.blogs ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return res.rows;
};

// Function to get a blog post by ID
exports.getBlogById = async (id) => {
  const res = await pool.query('SELECT * FROM blogs.blogs WHERE id = $1', [id]);
  return res.rows[0];
};

// Function to update a blog post
exports.updateBlog = async (id, title, content) => {
  const res = await pool.query(
    'UPDATE blogs.blogs SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *',
    [title, content, id]
  );
  return res.rows[0];
};

// Function to delete a blog post
exports.deleteBlog = async (id) => {
  await pool.query('DELETE FROM blogs.blogs WHERE id = $1', [id]);
};
