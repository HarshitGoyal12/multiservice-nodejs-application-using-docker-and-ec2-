// Import required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Controller to register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await userModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userModel.createUser(username, hashedPassword);

    // Respond with the created user (excluding password)
    res.status(201).json({ id: newUser.id, username: newUser.username });
  } catch (error) {
    console.error('Error in register:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to authenticate a user and provide JWT
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with token
    res.json({ token });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get user details
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user details (excluding password)
    res.json({ id: user.id, username: user.username });
  } catch (error) {
    console.error('Error in getUser:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update user details
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only allow the user themselves to update
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Prepare updated fields
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await userModel.updateUser(id, updatedFields);

    // Respond with updated user details
    res.json({ id: updatedUser.id, username: updatedUser.username });
  } catch (error) {
    console.error('Error in updateUser:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only allow the user themselves to delete
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete user
    await userModel.deleteUser(id);

    // Respond with no content
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteUser:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};