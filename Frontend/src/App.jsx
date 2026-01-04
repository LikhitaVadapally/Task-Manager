import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './contexts/AuthContext';
import { getAllTasks, createTask, updateTask, deleteTask } from './services/api';
import './App.css';

function App() {
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // Fetch tasks after auth
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        // Update existing task
        await updateTask(editingTask.id, taskData);
        showNotification('Task updated successfully!');
      } else {
        // Create new task
        await createTask(taskData);
        showNotification('Task created successfully!');
      }
      
      setShowForm(false);
      setEditingTask(null);
      await fetchTasks();
    } catch (err) {
      showNotification(err.message || 'Failed to save task', 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(taskId);
      showNotification('Task deleted successfully!');
      await fetchTasks();
    } catch (err) {
      showNotification(err.message || 'Failed to delete task', 'error');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      await updateTask(taskId, { status: newStatus });
      await fetchTasks();
    } catch (err) {
      showNotification(err.message || 'Failed to update task status', 'error');
      await fetchTasks();
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleLogout = () => {
    logout();
    setTasks([]);
    setError(null);
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        {showRegister ? (
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </>
    );
  }

  // Show dashboard if authenticated
  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>📋 Task Manager</h1>
              <p className="subtitle">Welcome, {user?.username}! Organise your tasks efficiently</p>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="dashboard-header">
            <h2>Task Dashboard</h2>
            <button className="btn-primary" onClick={handleCreateTask}>
              + Add New Task
            </button>
          </div>

          {error && (
            <div className="error-banner">
              <span>⚠️ {error}</span>
              <button onClick={fetchTasks}>Retry</button>
            </div>
          )}

          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            loading={loading}
          />
        </div>
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={handleCancelForm}
        />
      )}

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? '✓' : '✕'} {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;
