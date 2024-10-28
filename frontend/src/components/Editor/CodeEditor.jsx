import React from "react";
import { Editor } from "@monaco-editor/react";
import { FaPlay } from "react-icons/fa6";
import { useCodeEditorContext } from "../../contexts/CodeEditorContext";

// Sidebar Component for file navigation
const Sidebar = () => {
  return (
    <div className="bg-[#474648] w-48 h-screen p-4 flex-shrink-0 rounded-l-lg">
      {/* Window Control Icons */}
      <div className="flex space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      {/* File List */}
      {/* <ul className="text-gray-300 space-y-2">
        <li className="flex items-center space-x-2 bg-gray-600 p-2 rounded-md">
          <img
            src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
            alt="File icon"
            className="w-4 h-4"
          />
          <span>toplevel.v</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded-md">
          <img
            src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
            alt="File icon"
            className="w-4 h-4"
          />
          <span>toplevel.vcd</span>
        </li>
      </ul> */}
    </div>
  );
};

// Header Component for the editor
const EditorHeader = () => {
  return (
    <div className="text-white px-4 py-2 flex justify-between bg-[#262227] items-center rounded-t-lg">
      {/* Left side (File name and path) */}
      <div className="flex items-center">
        <h2 className="text-lg font-semibold">Example</h2>
        <span className="text-gray-400 text-sm ml-2">toplevel.v</span>
      </div>

      {/* Right side (Icons) */}
      <div className="flex space-x-3 items-center">
        <FaPlay className="text-[#929093] cursor-pointer" />

        {/* Play/Run Button */}
        <button className="w-4 h-4 bg-gray-600 rounded-full" />

        {/* Stop Button */}
        <button className="w-4 h-4 bg-gray-600 rounded-full" />

        {/* Power/Shutdown Icon */}
        <button className="w-4 h-4 bg-gray-600 rounded-full" />
      </div>
    </div>
  );
};

// Main Component that includes Sidebar, Header, and Editor
const CodeEditorWithSidebar = () => {
  const { language, theme } = useCodeEditorContext();
  return (
    <div className="flex border border-gray-700 rounded-lg overflow-hidden h-[400px]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Header */}
        <EditorHeader />

        {/* Code Editor */}
        <div className=" border-t border-gray-700 h-screen">
          <Editor
            height="100%"
            language={language}
            theme={"vs-dark"}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
              minimap: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditorWithSidebar;
