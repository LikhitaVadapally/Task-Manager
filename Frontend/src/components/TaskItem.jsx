import StatusDropdown from './StatusDropdown';
import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'todo':
        return 'status-todo';
      case 'in-progress':
        return 'status-in-progress';
      case 'done':
        return 'status-done';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`task-item ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button
            className="btn-edit"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <div className="task-status-container">
          <label className="status-label">Status:</label>
          <StatusDropdown
            currentStatus={task.status}
            onStatusChange={onStatusChange}
            taskId={task.id}
          />
        </div>
        <div className="task-meta">
          {task.createdAt && (
            <span className="task-date" title={`Created: ${formatDate(task.createdAt)}`}>
              Created {formatDate(task.createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;

