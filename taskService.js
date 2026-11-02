
import axios from "axios";

const API_URL =
  "https://jsonplaceholder.typicode.com/todos?_limit=10";

export async function fetchTasks() {
  const response = await axios.get(API_URL);

  return response.data.map((todo) => ({
    id: `api-${todo.id}`,
    title: todo.title,
    description: `Task imported from the demo API (${todo.id}).`,
    priority: todo.id % 4 === 0
      ? "High"
      : todo.id % 2 === 0
        ? "Medium"
        : "Low",
    status: todo.completed ? "Completed" : "Pending",
    createdAt: new Date().toISOString(),
  }));
}
