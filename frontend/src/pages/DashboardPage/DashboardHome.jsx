import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useOutletContext } from "react-router-dom";

const DashboardHome = () => {
  const { openModal } = useOutletContext();

  return (
    <div>
      <Dashboard openModal={openModal} />
    </div>
  );
};

export default DashboardHome;
