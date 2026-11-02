
import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  loading,
  error,
  onRetry,
  onToggle,
  onDelete,
  hasFilters,
  onClear,
}) {
  if (loading) {
    return <p className="state-message">Loading tasks...</p>;
  }

  if (error) {
    return (
      <div className="state-message">
        <p>{error}</p>
        <button className="primary-button" onClick={onRetry}>
          Try Again
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="state-message">
        <h3>{hasFilters ? "No matching tasks" : "No tasks yet"}</h3>
        <p>
          {hasFilters
            ? "Try changing your search or filters."
            : "Add your first task using the form."}
        </p>
        {hasFilters && (
          <button className="secondary-button" onClick={onClear}>
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
