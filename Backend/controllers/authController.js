import jwt from 'jsonwebtoken';
import { pick, some } from 'lodash';
import * as User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

// Register new user
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (some([username, email, password], (field) => !field)) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Check if username already exists
    const existingUserByUsername = await User.findByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if email already exist
    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Pasword validation
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Create new user
    const user = await User.create({ username, email, password });
    const token = jwt.sign(
      pick(user, ['id', 'username']),
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: pick(user, ['id', 'username', 'email'])
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
}

// Login user
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (some([username, password], (field) => !field)) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      pick(user, ['id', 'username']),
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: pick(user, ['id', 'username', 'email'])
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}

