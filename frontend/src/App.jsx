import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Editor from "./pages/EditorPage";

import DashboardLayout from "./pages/DashboardPage/DashboardLayout";
import DashboardHome from "./pages/DashboardPage/DashboardHome";
import MyProjects from "./pages/DashboardPage/MyProjects";
import Settings from "./pages/DashboardPage/Settings";
import { CodeEditorProvider } from "./contexts/CodeEditorContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; // Import the PublicRoute component
import { ProjectProvider } from "./contexts/ProjectContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Toaster />
        <Router>
          <Routes>
            {/* Public routes wrapped with PublicRoute */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Landing />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            {/* Protected Editor Route */}

            <Route
              path="/editor/:id"
              element={
                <ProtectedRoute>
                  <CodeEditorProvider>
                    <Editor />
                  </CodeEditorProvider>
                </ProtectedRoute>
              }
            />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="all-projects" element={<MyProjects />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default App;
