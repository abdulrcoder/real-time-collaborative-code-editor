import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Header = ({ openModal }) => {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={openModal}
          className="bg-secondary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          + New Project
        </button>

        <img
          src={user?.profileImage || "/no-avatar.png"}
          alt="User Profile"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
};

export default Header;
