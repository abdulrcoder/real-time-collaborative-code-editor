import React from "react";
import { useCodeEditorContext } from "../../contexts/CodeEditorContext";

const ThemeSelector = () => {
  const { theme, setTheme } = useCodeEditorContext();
  // List of themes supported by Monaco Editor
  const themes = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Solarized Light", value: "solarized-light" },
    { label: "Solarized Dark", value: "solarized-dark" },
    { label: "High Contrast", value: "hc-black" },
    { label: "Quiet Light", value: "quietlight" },
    { label: "Github", value: "github" },
    { label: "Dracula", value: "dracula" },
    { label: "Monokai", value: "monokai" },
    { label: "Kimbie Dark", value: "kimbie.dark" },
    { label: "Kimbie Light", value: "kimbie.light" },
    { label: "Ayu Light", value: "ayu-light" },
    { label: "Ayu Mirage", value: "ayu-mirage" },
    { label: "Material Theme", value: "material-theme" },
    { label: "Material Theme Palenight", value: "material-theme-palenight" },
  ];

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };
  return (
    <div className="mb-4">
      <label htmlFor="theme" className="block text-lg mb-2">
        Select Theme
      </label>
      <select
        id="theme"
        value={theme}
        onChange={handleThemeChange}
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
