import { useContext } from "react";
import { ThemeContext } from "../Context/contextTheme";
import { FiSun, FiMoon } from "react-icons/fi"; // أيقونات شمس وقمر
import "./Theme-Buttons.css";

export function ThemeButtons() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="container">
      <div className="Theme-Buttons">
        <button onClick={toggleTheme} className="btn-mode">
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
      </div>
    </div>
  );
}
