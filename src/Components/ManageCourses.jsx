import { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const ManageCourses = () => {
  const { user } = use(AuthContext);
  const [courses, setCourses] = useState([]);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const navigate = useNavigate();

  // Fetch user's own courses
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/courses`)
        .then((res) => {
          const myCourses = res.data.filter(
            (course) => course.addedBy?.email === user.email
          );
          setCourses(myCourses);
        })
        .catch((err) => {
          console.error("Error loading courses:", err);
        });
    }
  }, [user]);

  // Delete course
  const handleDelete = (courseId) => {
    axios
      .delete(`http://localhost:3000/courses/${courseId}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          setCourses(courses.filter((c) => c._id !== courseId));
          Swal.fire({
            icon: "success",
            title: "Course Deleted",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to delete course", "error");
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-center">
        Manage Your Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-zinc-500">No courses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border text-sm">
            <thead className="bg-purple-100 text-purple-800">
              <tr>
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Description</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-t">
                  <td className="py-2 px-3">{course.title}</td>
                  <td className="py-2 px-3">{course.description}</td>
                  <td className="py-2 px-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/edit-course/${course._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingCourse(course)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCourse && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Confirm Delete
            </h3>
            <p className="text-sm text-zinc-700 mb-4">
              Are you sure you want to delete the course "
              <strong>{deletingCourse.title}</strong>"?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingCourse(null)}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(deletingCourse._id);
                  setDeletingCourse(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
