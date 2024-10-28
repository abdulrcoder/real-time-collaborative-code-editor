// src/components/Editor/CollaboratorsList.js
import React from "react";

const collaborators = [
  { name: "Alice", imageUrl: "/logo.png" },
  { name: "Bob", imageUrl: "" }, // No image, will display "B"
  { name: "Charlie", imageUrl: "/logo.png" },
  { name: "David", imageUrl: "" }, // No image, will display "D"
  { name: "Lavid", imageUrl: "" }, // No image, will display "D"
  { name: "Nob", imageUrl: "" }, // No image, will display "B"
  { name: "Pharlie", imageUrl: "/logo.png" },
];

const CollaboratorsList = () => {
  return (
    <div className="h-[400px] border border-gray-700 rounded-lg p-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-2">Collaborators</h2>
      <ul className="flex flex-wrap gap-4">
        {collaborators.map((collaborator, index) => (
          <li key={index} className="flex items-center space-x-3">
            {collaborator.imageUrl ? (
              <img
                src={collaborator.imageUrl}
                alt={collaborator.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                {collaborator.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-gray-300">{collaborator.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaboratorsList;
