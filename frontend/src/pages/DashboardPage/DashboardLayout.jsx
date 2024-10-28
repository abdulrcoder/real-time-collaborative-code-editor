import React, { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import NewProjectModal from "../../components/Dashboard/NewProjectModal";

const DashboardLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen bg-primary text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area with Outlet for nested routes */}
      <div className="flex-1 p-6 md:ml-64">
        <Outlet context={{ openModal }} />
        {isModalOpen && <NewProjectModal closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default DashboardLayout;
