import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash } from "react-icons/fi";
import CodeEditor from "../components/Editor/CodeEditor";
import CollaboratorCursor from "../components/Editor/CollaboratorCursor";
import CollaboratorsList from "../components/Editor/CollaboratorsList";
import LanguageSelector from "../components/Editor/LanguageSelector";
import { useProjects } from "../contexts/ProjectContext";
import { AuthContext } from "../contexts/AuthContext";
import Modal from "../components/Editor/Modal";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getProjectById,
    singleProject,
    updateProject,
    deleteProject,
    loading,
    error,
  } = useProjects();
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTitle, setEditableTitle] = useState("");
  const [editableDescription, setEditableDescription] = useState("");

  useEffect(() => {
    getProjectById(id);
  }, [id]);

  useEffect(() => {
    if (singleProject) {
      setEditableTitle(singleProject.title);
      setEditableDescription(singleProject.description);
    }
  }, [singleProject]);

  const handleSave = async () => {
    if (editableTitle && editableDescription) {
      await updateProject(id, {
        title: editableTitle,
        description: editableDescription,
      });
      setIsModalOpen(false);
      getProjectById(id);
    }
  };

  const handleDelete = async () => {
    // Display confirmation toast
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p>Are you sure you want to delete this project?</p>
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => {
                toast.dismiss(t.id); // Dismiss the toast
                deleteProject(id).then(() => {
                  navigate("/dashboard");
                  toast.success("Project deleted successfully!");
                });
              }}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)} // Dismiss on cancel
              className="px-3 py-1 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      <Toaster /> {/* Add Toaster component to render toast notifications */}
      {loading && <p className="text-center">Loading project details...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {singleProject && (
        <div className="mb-4 text-center flex gap-5 justify-center items-center">
          <div className="flex flex-col">
            {/* Project Title */}
            <h1 className="text-2xl font-semibold px-6 py-1">
              {singleProject.title}
            </h1>

            {/* Project Description */}
            <p className="mt-2 text-sm px-5 py-2 max-w-md md:max-w-2xl">
              {singleProject.description}
            </p>
          </div>

          {/* Edit and Delete Buttons */}
          {user._id === singleProject.userId && (
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition flex items-center gap-2"
              >
                Edit
                <FiEdit2 />
              </button>
              <button
                onClick={handleDelete}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                Delete
                <FiTrash />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-end gap-5 mr-5">
        <LanguageSelector />
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-1/5">
          <CollaboratorsList />
        </div>
        <div className="flex-grow md:w-3/4 md:mr-4">
          <CodeEditor />
        </div>
      </div>
      <div className="mt-4">
        <CollaboratorCursor />
      </div>
      {/* Edit Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <input
              type="text"
              value={editableTitle}
              onChange={(e) => setEditableTitle(e.target.value)}
              className="w-full text-lg font-semibold bg-gray-700 text-white px-2 py-1 rounded-md mb-4"
              placeholder="Project Title"
            />
            <textarea
              value={editableDescription}
              onChange={(e) => setEditableDescription(e.target.value)}
              className="w-full text-sm bg-gray-700 text-white px-2 py-2 rounded-md mb-4"
              placeholder="Project Description"
              rows="3"
            ></textarea>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditorPage;
