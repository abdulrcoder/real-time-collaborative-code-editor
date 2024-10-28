import { Link } from "react-router-dom";

const ProjectCard = ({ title, description, id }) => {
  return (
    <Link
      to={`/editor/${id}`}
      className="bg-gray-700 text-white p-4 rounded-lg shadow-md hover:bg-gray-600 transition"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-300 mt-2">{description}</p>
    </Link>
  );
};

export default ProjectCard;
