import React, { createContext, useContext, useState } from "react";

// Create the context
const CodeEditorContext = createContext();

// Custom hook to use the context
export const useCodeEditorContext = () => {
  return useContext(CodeEditorContext);
};

// Provider component
export const CodeEditorProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("javascript");

  return (
    <CodeEditorContext.Provider
      value={{ theme, setTheme, language, setLanguage }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};
