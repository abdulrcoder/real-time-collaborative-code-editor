import React from "react";
import ProjectList from "./ProjectList";
import Header from "./Header";
import { useProjects } from "../../contexts/ProjectContext";

const Dashboard = ({ openModal }) => {
  const { projects } = useProjects(); // Access projects from context

  // Get only the 4 most recent projects (context will provide at most 4)
  const displayedProjects = projects.slice(0, 4);

  return (
    <div className="p-6">
      <Header openModal={openModal} />

      {/* Description about the web app */}
      <p className="text-gray-400 mb-6">
        Welcome to the Real-Time Collaborative Code Editor! This application
        allows developers to write, edit, and collaborate on code in real-time.
        With a powerful code editor powered by Monaco, you can create and manage
        your projects effortlessly. Explore your recent projects below and start
        collaborating with your peers today!
      </p>

      {/* Additional Features Section */}
      <h3 className="text-xl font-semibold mb-2">Key Features</h3>
      <p className="text-gray-400 mb-4">
        Our platform is designed with a focus on enhancing productivity and
        fostering collaboration among developers. Here are some key features:
      </p>
      <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-6">
        <ul className="list-none space-y-4">
          <li className="flex items-start">
            <span className="text-2xl mr-2">🔗</span>
            <div>
              <strong className="text-white">Real-Time Collaboration:</strong>
              <p className="text-gray-400">
                Work together with your team members in real-time, making coding
                sessions more interactive and efficient.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-2">🛠️</span>
            <div>
              <strong className="text-white">Powerful Code Editor:</strong>
              <p className="text-gray-400">
                The Code editor provides syntax highlighting, intelligent code
                completion, and other advanced features to improve your coding
                experience.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-2">🌐</span>
            <div>
              <strong className="text-white">Cross-Platform Access:</strong>
              <p className="text-gray-400">
                Access your projects from any device, anywhere, ensuring
                flexibility and convenience.
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Title Heading */}
      <h2 className="text-2xl font-bold mb-2">Recent Projects</h2>

      <main>
        {/* Pass the displayed projects to ProjectList */}
        <ProjectList projects={displayedProjects} />
      </main>
    </div>
  );
};

export default Dashboard;
