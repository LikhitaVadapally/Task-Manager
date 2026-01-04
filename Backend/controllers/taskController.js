import * as Task from '../models/Task.js';

// Create atask 
export async function createTask(req, res) {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (status && !['todo', 'in-progress', 'done'].includes(status)) {
      return res.status(400).json({ 
        error: 'Status must be one of: todo, in-progress, done' 
      });
    }

    const task = await Task.create({ title, description, status, user_id: userId });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

// Get all tasks
export async function getAllTasks(req, res) {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

// Update task
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.id; 
    if (status && !['todo', 'in-progress', 'done'].includes(status)) {
      return res.status(400).json({ 
        error: 'Status must be one of: todo, in-progress, done' 
      });
    }

    // Update task
    const updatedTask = await Task.update(parseInt(id), { 
      title, 
      description, 
      status 
    }, userId);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found or you do not have permission to update it' });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
}

// Delete task 
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedTask = await Task.deleteTask(parseInt(id), userId);
    
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found or you do not have permission to delete it' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

