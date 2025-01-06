const { Pool } = require('pg');

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to add a new comment
exports.addComment = async (post_id, content, author_id) => {
  const res = await pool.query(
    'INSERT INTO comments.comments (post_id, content, author_id) VALUES ($1, $2, $3) RETURNING *',
    [post_id, content, author_id]
  );
  return res.rows[0];
};

// Function to get comments by blog post ID
exports.getCommentsByPostId = async (post_id) => {
  const res = await pool.query(
    'SELECT * FROM comments.comments WHERE post_id = $1 ORDER BY created_at ASC',
    [post_id]
  );
  return res.rows;
};
