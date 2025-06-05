import { useLoaderData } from "react-router";
import Course from "./Course";

const Courses = () => {
  const courses = useLoaderData();

  return (
    <div className="min-h-screen px-4 lg:px-0 my-5 lg:my-8">
      <h2 className="text-3xl font-bold text-center text-zinc-800 mb-5">
        All Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course) => (
          <Course key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
