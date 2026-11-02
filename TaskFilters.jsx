
import { useEffect, useRef } from "react";

export default function TaskFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onClear,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <section className="panel">
      <h2>My Tasks</h2>

      <input
        ref={searchRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks by title..."
        aria-label="Search tasks"
      />

      {search && (
        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            setSearch("");
            searchRef.current?.focus();
          }}
        >
          Clear search
        </button>
      )}

      <div className="filter-row">
        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          aria-label="Filter by priority"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All priorities</option>
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>
      </div>

      <button
        type="button"
        className="secondary-button"
        onClick={onClear}
      >
        Clear all filters
      </button>
    </section>
  );
}
