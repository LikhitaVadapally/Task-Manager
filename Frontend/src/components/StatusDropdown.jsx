import './StatusDropdown.css';

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

function StatusDropdown({ currentStatus, onStatusChange, taskId }) {
  const handleChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(taskId, newStatus);
  };

  return (
    <select 
      className="status-dropdown" 
      value={currentStatus} 
      onChange={handleChange}
      aria-label="Task status"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default StatusDropdown;

