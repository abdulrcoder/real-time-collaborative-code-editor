// Signup.js
import React, { useState, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Attempt to register
      await register(name, email, password, profilePic);

      // If registration is successful, reset form and navigate to dashboard
      setName("");
      setEmail("");
      setPassword("");
      setProfilePic(null);
      setError(""); // Clear error message
      navigate("/dashboard");
    } catch (err) {
      // Display error message if registration fails
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1D2C3E] px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#1D2C3E]">
          Create Your Account
        </h2>

        <div className="flex items-center justify-center mt-4 mb-6">
          <label htmlFor="profilePic" className="relative">
            <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden border-4 border-[#03E3B0] bg-gray-100">
              {profilePic ? (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  Upload
                </div>
              )}
            </div>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-[#03E3B0] focus:border-[#03E3B0]"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-[#03E3B0] focus:border-[#03E3B0]"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-[#03E3B0] focus:border-[#03E3B0]"
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 right-3 mt-4 flex items-center cursor-pointer text-gray-500 hover:text-[#03E3B0]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 bg-[#03E3B0] hover:bg-[#029d84] text-white font-semibold rounded-lg shadow-md"
          >
            {loading ? "Singup.." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm sm:text-base text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#03E3B0] hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
