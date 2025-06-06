import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { use } from "react";
import Swal from "sweetalert2";

const AddCourse = () => {
  const { user } = use(AuthContext);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.value;
    const duration = form.duration.value;
    const seats = Number(form.seats.value); // ✅ Convert to number

    const courseData = {
      title,
      description,
      image,
      duration,
      seats,
      addedBy: {
        name: user?.displayName || "Anonymous",
        email: user?.email || "unknown@example.com",
      },
      createdAt: new Date(),
    };

    axios
      .post("https://academ-iq-server.vercel.app/courses", courseData)
      .then((res) => {
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
        <h2 className="text-2xl font-bold text-center text-zinc-800 mb-6">
          Add New Course
        </h2>
        <title>AcademIQ | Add Course</title>
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
              className="w-full px-4 py-2 border border-zinc-300 "
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
              className="w-full px-4 py-2 border border-zinc-300 "
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
              className="w-full px-4 py-2 border border-zinc-300 "
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
              className="w-full px-4 py-2 border border-zinc-300 "
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Total Seats
            </label>
            <input
              type="number"
              name="seats"
              required
              min={1}
              placeholder="e.g. 10"
              className="w-full px-4 py-2 border border-zinc-300 "
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 cursor-pointer text-white py-2 px-4 hover:bg-purple-800 transition"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
