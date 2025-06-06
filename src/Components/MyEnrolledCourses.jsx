import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const MyEnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enrolled courses
  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://academ-iq-server.vercel.app/my-enrollments?email=${user.email}`
        )
        .then((res) => setEnrollments(res.data))
        .catch(() => {
          Swal.fire("Error", "Failed to load enrolled courses", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleRemove = (courseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be unenrolled from this course.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7319c1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://academ-iq-server.vercel.app/remove-enrollment`, {
            data: { email: user.email, courseId },
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Enrollment removed",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
              });
              setEnrollments((prev) =>
                prev.filter((e) => e.course._id !== courseId)
              );
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to remove enrollment", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg text-purple-700"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-zinc-800">
        My Enrolled Courses
      </h2>

      <title>AcademIQ | My Enrolled</title>

      {enrollments.length === 0 ? (
        <p className="text-center text-zinc-600">
          You haven’t enrolled in any courses yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-zinc-200">
            <thead className="bg-purple-50 text-zinc-700">
              <tr>
                <th>Course</th>
                <th>Duration</th>
                <th>Added By</th>
                <th>Enrolled At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map(({ course, enrolledAt }) => (
                <tr key={course._id}>
                  <td className="font-semibold text-zinc-800">
                    {course.title}
                  </td>
                  <td>{course.duration}</td>
                  <td>{course.addedBy?.name || "Unknown"}</td>
                  <td>{new Date(enrolledAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(course._id)}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Remove Enrollment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
