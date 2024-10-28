import React, { useEffect } from "react";
import { FaHome, FaFolder, FaCog } from "react-icons/fa"; // Icons for visual enhancement
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Define a function to check if the current path matches
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 hidden md:block bg-gray-800 h-screen text-white p-6 space-y-6 fixed left-0 top-0">
      <h2 className="text-2xl font-bold text-center mb-4">Code Editor</h2>
      <div className="space-y-6">
        <Link
          to="/dashboard"
          className={`flex items-center space-x-3 hover:text-secondary hover:bg-gray-700 transition p-3 rounded-md ${
            isActive("/dashboard") ? "bg-gray-700 text-secondary" : ""
          }`}
        >
          <FaHome className="text-xl" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/dashboard/all-projects"
          className={`flex items-center space-x-3 hover:text-secondary hover:bg-gray-700 transition p-3 rounded-md ${
            isActive("/dashboard/all-projects")
              ? "bg-gray-700 text-secondary"
              : ""
          }`}
        >
          <FaFolder className="text-xl" />
          <span>All Projects</span>
        </Link>
        <Link
          to="/dashboard/settings"
          className={`flex items-center space-x-3 hover:text-secondary hover:bg-gray-700 transition p-3 rounded-md ${
            isActive("/dashboard/settings") ? "bg-gray-700 text-secondary" : ""
          }`}
        >
          <FaCog className="text-xl" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
