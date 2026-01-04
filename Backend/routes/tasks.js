import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/tasks', authenticateToken, taskController.createTask);

router.get('/tasks', authenticateToken, taskController.getAllTasks);

router.put('/tasks/:id', authenticateToken, taskController.updateTask);

router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);

export default router;

