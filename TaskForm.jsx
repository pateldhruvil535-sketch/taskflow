
import { useRef, useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      titleRef.current?.focus();
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setError("");
    titleRef.current?.focus();
  }

  return (
    <section className="panel">
      <h2>Create a Task</h2>
      <p className="muted">Add something to your to-do list.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Task Title *</label>
        <input
          ref={titleRef}
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Enter task title"
        />

        {error && <p className="error-text">{error}</p>}

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows="3"
        />

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="primary-button" type="submit">
          + Add Task
        </button>
      </form>
    </section>
  );
}
