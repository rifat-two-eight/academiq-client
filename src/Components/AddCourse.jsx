import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const AddCourse = () => {
  const { user } = useContext(AuthContext);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.value;
    const duration = form.duration.value;

    const courseData = {
      title,
      description,
      image,
      duration,
      addedBy: {
        name: user?.displayName || "Unknown",
        email: user?.email || "N/A",
      },
      createdAt: new Date().toISOString(),
    };

    // TODO: Replace this with your POST API call
    console.log("Course submitted:", courseData);
    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-0 py-10">
      <div className="w-full max-w-xl bg-white shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Add New Course
        </h2>
        <form onSubmit={handleAddCourse} className="space-y-4">
          {/* Course Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. JavaScript Essentials"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Short Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Write a short summary of the course"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
              rows={4}
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Duration (e.g. 4 weeks, 12 hours)
            </label>
            <input
              type="text"
              name="duration"
              required
              placeholder="e.g. 6 weeks"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
