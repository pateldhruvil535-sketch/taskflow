
import { CheckSquare, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme, user } = useTheme();

  return (
    <header className="topbar">
      <div className="brand">
        <CheckSquare size={27} />
        <div>
          <h2>TaskFlow</h2>
          <small>Task Management</small>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>

        <div className="avatar">{user.initials}</div>
        <span className="user-name">{user.name}</span>
      </div>
    </header>
  );
}
