import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-primary text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center p-8 md:p-16">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            Real-Time Collaborative Code Editor
          </h1>
          <p className="text-lg md:text-xl mt-4">
            Collaborate, code, and create together with live updates, code
            execution, and a seamless editing experience.
          </p>
          <Link to={`/dashboard`}>
            <button className="bg-secondary mt-5 text-primary px-6 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition">
              Get Started
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="/preview.png"
            alt="Collaborative Code Editor Preview"
            className="w-full h-auto rounded-lg "
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary text-primary py-16 px-8">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center text-white justify-between mt-12 space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/3 bg-primary p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">1. Create a Project</h3>
            <p className="mt-4">
              Start a new coding project and invite collaborators to join.
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-primary p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">
              2. Real-Time Collaboration
            </h3>
            <p className="mt-4">
              Code together in real-time with live updates and multi-user
              support.
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-primary p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">3. Execute & Share</h3>
            <p className="mt-4">
              Run code, review outputs, and share results instantly.
            </p>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-secondary">
          What Our Users Say
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center mt-12 space-y-8 md:space-y-0 md:space-x-8">
          <div className="bg-primary p-6 rounded-lg w-full md:w-1/3">
            <p className="italic">
              "An essential tool for our remote team. Collaboration has never
              been this smooth!"
            </p>
            <span className="block mt-4 font-semibold">- Alex R.</span>
          </div>
          <div className="bg-primary p-6 rounded-lg w-full md:w-1/3">
            <p className="italic">
              "The real-time editing and code execution features are fantastic!"
            </p>
            <span className="block mt-4 font-semibold">- Maria K.</span>
          </div>
          <div className="bg-primary p-6 rounded-lg w-full md:w-1/3">
            <p className="italic">
              "Highly recommend it for coding interviews and group coding
              sessions!"
            </p>
            <span className="block mt-4 font-semibold">- Lee W.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-center py-6">
        <p className="text-sm">
          &copy; 2024 Real-Time Collaborative Code Editor. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
