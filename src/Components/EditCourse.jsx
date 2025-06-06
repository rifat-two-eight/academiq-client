import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  // Load course data
  useEffect(() => {
    axios
      .get(`https://academ-iq-server.vercel.app/course-details/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => {
        Swal.fire("Error", "Failed to load course data", "error");
      });
  }, [id]);

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCourse = {
      title: form.title.value,
      description: form.description.value,
      image: form.image.value,
      duration: form.duration.value,
      seats: Number(form.seats.value),
    };

    axios
      .put(`https://academ-iq-server.vercel.app/courses/${id}`, updatedCourse)
      .then((res) => {
        if (res.data.modifiedCount > 0 || res.data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Course updated successfully!",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/managecourses");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update course", "error");
      });
  };

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-purple-700"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-zinc-800 mb-6">
          Edit Course
        </h2>
        <title>AcademIQ | Edit </title>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={course.title}
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Short Description
            </label>
            <textarea
              name="description"
              defaultValue={course.description}
              required
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
              defaultValue={course.image}
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              defaultValue={course.duration}
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Seats
            </label>
            <input
              type="number"
              name="seats"
              min={1}
              defaultValue={course.seats}
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-md transition"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
