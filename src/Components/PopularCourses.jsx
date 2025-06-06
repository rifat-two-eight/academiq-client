import { useEffect, useState } from "react";
import Course from "./Course"; // Assuming you already have a reusable <Course /> component
import { motion } from "framer-motion";
import { Link } from "react-router";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/popular-courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) =>
        console.error("Error fetching popular courses:", error)
      );
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 py-12">
      <h2 className="text-3xl font-bold text-center text-zinc-800 mb-8">
        Popular Courses
      </h2>
      {courses.length === 0 ? (
        <div className="text-center text-zinc-500">
          No popular courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Course course={course} />
            </motion.div>
          ))}
        </div>
      )}
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

export default PopularCourses;
