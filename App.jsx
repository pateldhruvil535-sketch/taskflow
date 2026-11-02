
import { useCallback, useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import { fetchTasks } from "./services/taskService";

const STORAGE_KEY = "taskflow-tasks";

function getSavedTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return null;

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(() => getSavedTasks() ?? []);
  const [initialized, setInitialized] = useState(
    () => getSavedTasks() !== null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchTasks();

      setTasks((current) => {
        // Do not overwrite saved tasks when retrying.
        if (initialized) return current;
        return data;
      });

      setInitialized(true);
    } catch {
      setError("Could not load tasks. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  }, [initialized]);

  useEffect(() => {
    if (!initialized) {
      loadTasks();
    }
  }, [initialized, loadTasks]);

  useEffect(() => {
    if (!initialized) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The application still works without browser storage.
    }
  }, [tasks, initialized]);

  function addTask(data) {
    const newTask = {
      ...data,
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setTasks((current) => [newTask, ...current]);
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  const hasFilters =
    Boolean(search.trim()) ||
    statusFilter !== "All" ||
    priorityFilter !== "All";

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h1>Welcome to TaskFlow</h1>
            <p className="muted">
              Organize your work, set priorities, and get things done.
            </p>
          </div>
          <a className="primary-button new-task-link" href="#create-task">
            + New Task
          </a>
        </section>

        <section className="section">
          <h2>Dashboard Overview</h2>
          <DashboardStats tasks={tasks} />
        </section>

        <div className="workspace">
          <div id="create-task">
            <TaskForm onAddTask={addTask} />
          </div>

          <div>
            <TaskFilters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              onClear={clearFilters}
            />

            <div className="list-heading">
              <h2>Task List</h2>
              <span className="muted">
                {filteredTasks.length} tasks
              </span>
            </div>

            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onRetry={loadTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              hasFilters={hasFilters}
              onClear={clearFilters}
            />
          </div>
        </div>

        <footer className="footer">
          TaskFlow — Plan thoughtfully. Accomplish more.
        </footer>
      </main>
    </div>
  );
}
