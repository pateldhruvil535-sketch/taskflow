
const statDefinitions = [
  { key: "total", label: "Total Tasks", color: "blue" },
  { key: "pending", label: "Pending Tasks", color: "orange" },
  { key: "completed", label: "Completed Tasks", color: "green" },
  { key: "high", label: "High Priority", color: "red" },
];

export default function DashboardStats({ tasks }) {
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    high: tasks.filter((t) => t.priority === "High").length,
  };

  return (
    <section className="stats-grid">
      {statDefinitions.map((stat) => (
        <article className="stat-card" key={stat.key}>
          <div className={`stat-icon ${stat.color}`}>
            {stat.label}
          </div>
          <h2>{stats[stat.key]}</h2>
          <p>{stat.label}</p>
        </article>
      ))}
    </section>
  );
}
