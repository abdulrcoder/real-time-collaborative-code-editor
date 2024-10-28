import React from "react";

const RunCodeButton = () => {
  const handleRunCode = () => {
    // Logic to run the code
    console.log("Running code...");
  };

  return (
    <button
      onClick={handleRunCode}
      className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
    >
      Run Code
    </button>
  );
};

export default RunCodeButton;
