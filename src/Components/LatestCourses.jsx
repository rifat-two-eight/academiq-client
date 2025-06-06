import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LatestCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("https://academ-iq-server.vercel.app/latest-courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="mt-16 mb-8 px-4 lg:px-0">
      <h2 className="text-3xl font-bold text-center text-zinc-800 mb-5 lg:mb-8">
        Latest Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            className="shadow-md shadow-purple-300 hover:shadow-xl transition duration-400 bg-white overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-zinc-800">
                {course.title}
              </h3>
              <p className="text-sm text-zinc-600">
                {course.description?.slice(0, 90)}...
              </p>
              <p className="text-sm text-purple-700 font-medium">
                Duration: {course.duration}
              </p>
              <p className="text-sm text-zinc-500">
                Added:{" "}
                <span className="font-medium">
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </p>

              <Link
                to={`/courses/${course._id}`}
                className="inline-block mt-2 px-4 py-1.5 text-sm text-white bg-purple-700 hover:bg-purple-800 transition font-medium"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-7">
        <Link to="/courses">
          <button className="px-5 py-1 font-semibold border-2 border-purple-500 hover:border-purple-700 cursor-pointer">
            All Courses
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestCourses;
