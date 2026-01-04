import pool from '../config/database.js';

// Create a new task
async function create(taskData) {
  const { title, description, status = 'todo', user_id } = taskData;
  const query = `
    INSERT INTO tasks (title, description, status, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await pool.query(query, [title, description, status, user_id]);
  return result.rows[0];
}

// Get tasks for a specific user
async function findAll(userId) {
  const query = 'SELECT * FROM tasks WHERE user_id = $1 ORDER BY "createdat" DESC';
  const result = await pool.query(query, [userId]);
  return result.rows;
}

// Get task by ID
async function findById(id) {
  const query = 'SELECT * FROM tasks WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

// Update task
async function update(id, taskData, userId) {
  const { title, description, status } = taskData;
  const query = `
    UPDATE tasks
    SET title = COALESCE($1, title),
        description = COALESCE($2, description),
        status = COALESCE($3, status)
    WHERE id = $4 AND user_id = $5
    RETURNING *
  `;
  const result = await pool.query(query, [title, description, status, id, userId]);
  return result.rows[0];
}

// Delete task
async function deleteTask(id, userId) {
  const query = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *';
  const result = await pool.query(query, [id, userId]);
  return result.rows[0];
}

export { create, findAll, findById, update, deleteTask };

