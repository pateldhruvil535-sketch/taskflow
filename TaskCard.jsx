
import { Check, RotateCcw, Trash2 } from "lucide-react";

export default function TaskCard({ task, onToggle, onDelete }) {
  const completed = task.status === "Completed";

  return (
    <article className={`task-card ${completed ? "done" : ""}`}>
      <div className="task-card-heading">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        <span className={`status ${completed ? "finished" : ""}`}>
          {task.status}
        </span>
      </div>

      <h3>{task.title}</h3>
      <p className="muted">
        {task.description || "No description provided."}
      </p>

      <div className="task-buttons">
        <button
          className="complete-button"
          onClick={() => onToggle(task.id)}
        >
          {completed ? <RotateCcw size={15} /> : <Check size={15} />}
          {completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
