import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast"; // Import toast

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(user?.profileImage || null);
  const [isEditingName, setIsEditingName] = useState(false); // New state for edit mode

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Password:", password);
    console.log("Profile Photo:", profilePhoto);
    toast.success("Profile updated successfully!"); // Show success toast
  };

  const handleLogout = () => {
    // Show confirmation toast before logging out
    toast((t) => (
      <div className="flex flex-col items-center">
        <p>Are you sure you want to log out?</p>
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => {
              console.log("Logging out..."); // Debugging log
              logout(); // Call the logout function
              toast.dismiss(t.id); // Dismiss the toast
              toast.success("Logged out successfully!"); // Notify user of successful logout
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              console.log("Logout canceled."); // Debugging log
              toast.dismiss(t.id); // Dismiss on cancel
            }}
            className="px-3 py-1 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfilePhoto(user.profileImage);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-primary text-white p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-4">Settings</h2>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
      <p className="text-gray-400 mb-6">
        Update your profile information below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo Upload */}
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
          <div className="flex-shrink-0">
            <img
              src={
                profilePhoto
                  ? typeof profilePhoto === "string"
                    ? profilePhoto
                    : URL.createObjectURL(profilePhoto)
                  : "/no-avatar.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-secondary"
            />
          </div>
          <div className="mt-4 md:mt-0">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-white hover:file:bg-green-600"
            />
            <p className="text-gray-400 text-sm mt-2">Upload profile photo</p>
          </div>
        </div>

        {/* Name Input with Edit Option */}
        <div className="flex items-center space-x-2">
          <div className="w-full">
            <label htmlFor="name" className="block text-lg mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={!isEditingName}
              className={`w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none ${
                isEditingName
                  ? "text-white"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            />
          </div>
          <button
            type="button"
            onClick={toggleEditName}
            className="bg-secondary mt-8 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
          >
            {isEditingName ? "Save" : "Edit"}
          </button>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-lg mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Enter your new password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-secondary text-white hover:bg-green-600 transition"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
