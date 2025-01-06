// Import required modules
const { Pool } = require('pg');

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to find user by username
exports.findByUsername = async (username) => {
  const res = await pool.query('SELECT * FROM users.users WHERE username = $1', [username]);
  return res.rows[0];
};

// Function to find user by ID
exports.findById = async (id) => {
  const res = await pool.query('SELECT * FROM users.users WHERE id = $1', [id]);
  return res.rows[0];
};

// Function to create a new user
exports.createUser = async (username, hashedPassword) => {
  const res = await pool.query(
    'INSERT INTO users.users (username, password) VALUES ($1, $2) RETURNING *',
    [username, hashedPassword]
  );
  return res.rows[0];
};

// Function to update user details
exports.updateUser = async (id, fields) => {
  const { username, password } = fields;
  const res = await pool.query(
    'UPDATE users.users SET username = COALESCE($1, username), password = COALESCE($2, password) WHERE id = $3 RETURNING *',
    [username, password, id]
  );
  return res.rows[0];
};

// Function to delete a user
exports.deleteUser = async (id) => {
  await pool.query('DELETE FROM users.users WHERE id = $1', [id]);
};
