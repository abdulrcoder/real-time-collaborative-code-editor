import React from "react";
import AllProjects from "../../components/Dashboard/AllProjects";
import { useOutletContext } from "react-router-dom";

const MyProjects = () => {
  const { openModal } = useOutletContext();

  return (
    <div>
      <AllProjects openModal={openModal} />
    </div>
  );
};

export default MyProjects;
