const API_BASE_URL = 'http://localhost:3000';

/**
 * Get the authentication token from localStorage
 * @returns {string|null} JWT token or null
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * Get headers with authentication token
 * @returns {Object} Headers object with Content-Type and Authorization
 */
function getAuthHeaders() {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Fetch all tasks from the backend
 * @returns {Promise<Array>} Array of task objects
 */
export async function getAllTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Token expired or invalid, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

/**
 * Create a new task
 * @param {Object} taskData - Task data { title, description?, status? }
 * @returns {Promise<Object>} Created task object
 */
export async function createTask(taskData) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to create task: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

/**
 * Update an existing task
 * @param {number} id - Task ID
 * @param {Object} taskData - Task data { title?, description?, status? }
 * @returns {Promise<Object>} Updated task object
 */
export async function updateTask(id, taskData) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to update task: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

/**
 * Delete a task
 * @param {number} id - Task ID
 * @returns {Promise<Object>} Success message
 */
export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to delete task: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

