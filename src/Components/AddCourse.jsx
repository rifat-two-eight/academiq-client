import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

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
        name: user?.displayName || "Anonymous",
        email: user?.email || "unknown@example.com",
      },
      createdAt: new Date(),
    };

    axios.post("http://localhost:3000/courses", courseData).then((res) => {
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Add New Course
        </h2>
        <form onSubmit={handleAddCourse} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. JavaScript Essentials"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Short Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Write a short summary of the course"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md"
              rows={4}
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Duration (e.g. 4 weeks)
            </label>
            <input
              type="text"
              name="duration"
              required
              placeholder="e.g. 6 weeks"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-purple-800 transition"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
