import React from "react";
import { useCodeEditorContext } from "../../contexts/CodeEditorContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useCodeEditorContext();

  // List of languages supported by Monaco Editor
  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "HTML", value: "html" },
    { label: "CSS", value: "css" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C#", value: "csharp" },
    { label: "C++", value: "cpp" },
    { label: "C", value: "c" },
    { label: "PHP", value: "php" },
    { label: "Ruby", value: "ruby" },
    { label: "Go", value: "go" },
    { label: "Swift", value: "swift" },
    { label: "Kotlin", value: "kotlin" },
    { label: "SQL", value: "sql" },
    { label: "R", value: "r" },
    { label: "Shell", value: "shell" },
  ];

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <div className="mb-4 w-fit   ">
      <select
        id="language"
        value={language}
        onChange={handleLanguageChange}
        className="w-full p-3 rounded-lg bg-[#1E1E1E] outline-none border-none text-white "
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
