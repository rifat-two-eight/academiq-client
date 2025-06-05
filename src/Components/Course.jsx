import { motion } from "framer-motion";
import { Link } from "react-router";

const Course = ({ course }) => {
  const { title, image, description, duration, addedBy } = course;

  return (
    <motion.div
      className=" shadow-md shadow-purple-300 hover:shadow-xl transition duration-400"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-5 space-y-2">
        <h3 className="text-xl font-semibold text-zinc-800">{title}</h3>
        <p className="text-sm text-zinc-600">{description}</p>
        <p className="text-sm text-purple-700 font-medium">
          Duration: {duration}
        </p>

        {addedBy?.name && (
          <p className="text-xs text-zinc-500">
            Added by: <span className="font-medium">{addedBy.name}</span>
          </p>
        )}
        <Link
          to={`/courses/${course._id}`}
          className="inline-block mt-2 px-4 py-1.5 text-sm text-white bg-purple-700 hover:bg-purple-800 transition font-medium"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Course;
