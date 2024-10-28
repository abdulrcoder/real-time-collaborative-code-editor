import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import { useProjects } from "../contexts/ProjectContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { fetchProjects } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.success) {
      navigate("/dashboard"); // Redirect on successful login
      fetchProjects();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1D2C3E] px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#1D2C3E]">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
          Please log in to your account
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
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
            className={`w-full py-2 mt-4 ${
              loading ? "bg-gray-400" : "bg-[#03E3B0] hover:bg-[#029d84]"
            } text-white font-semibold rounded-lg shadow-md`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#03E3B0] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
