import { useEffect, useState } from "react";

export function ThemeSwitcherToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      className="w-9 h-9 rounded-full border border-purple-400/30 flex items-center justify-center text-sm hover:bg-purple-400/10 transition"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}