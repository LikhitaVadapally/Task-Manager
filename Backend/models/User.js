import pool from '../config/database.js';
import bcrypt from 'bcrypt';

// Create new user 
async function create(userData) {
  const { username, email, password } = userData;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, "createdAt"
  `;
  const result = await pool.query(query, [username, email, hashedPassword]);
  return result.rows[0];
}

// Find user by username
async function findByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0];
}

// Find user by email
async function findByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

// Find user by id
async function findById(id) {
  const query = 'SELECT id, username, email, "createdAt" FROM users WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

// Compare password
async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export { create, findByUsername, findByEmail, findById, verifyPassword };

