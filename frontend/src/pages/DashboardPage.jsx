import React, { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import NewProjectModal from "../components/Dashboard/NewProjectModal";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen bg-primary text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Dashboard openModal={openModal} />
        {isModalOpen && <NewProjectModal closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default DashboardPage;
