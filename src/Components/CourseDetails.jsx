import { useEffect, useState, useCallback, use } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolledCount, setEnrolledCount] = useState(undefined);
  const [userCourseCount, setUserCourseCount] = useState(0);

  // Helper to refresh all course/enroll-related data
  const refreshDetails = useCallback(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://academ-iq-server.vercel.app/course-details/${id}`).then(
        (res) => res.json()
      ),
      user?.email
        ? fetch(
            `https://academ-iq-server.vercel.app/enrollment-check?email=${user.email}&courseId=${id}`
          ).then((res) => res.json())
        : Promise.resolve({ enrolled: false }),
      user?.email
        ? fetch(
            `https://academ-iq-server.vercel.app/user-enrollment-count?email=${user.email}`
          ).then((res) => res.json())
        : Promise.resolve({ count: 0 }),
    ])
      .then(([courseData, enrollCheckData, userCountData]) => {
        if (courseData.error) {
          throw new Error(courseData.error);
        }
        setCourse(courseData);
        setEnrolledCount(courseData.enrolledCount);
        setEnrolled(enrollCheckData.enrolled);
        setUserCourseCount(userCountData.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.message === "Course not found"
              ? "Course not found"
              : "Failed to load course details. Please try again.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        setLoading(false);
      });
  }, [id, user]); // Dependencies for useCallback

  // Initial fetch
  useEffect(() => {
    refreshDetails();
  }, [refreshDetails]); // Include memoized refreshDetails

  // Enroll / Unenroll handler with optimistic updates
  const handleEnrollToggle = () => {
    const wasEnrolled = enrolled;
    const wasEnrolledCount = enrolledCount;
    const wasUserCourseCount = userCourseCount;

    // Optimistic update
    setEnrolled(!enrolled);
    setEnrolledCount(wasEnrolled ? wasEnrolledCount - 1 : wasEnrolledCount + 1);
    setUserCourseCount(
      wasEnrolled ? wasUserCourseCount - 1 : wasUserCourseCount + 1
    );

    fetch("https://academ-iq-server.vercel.app/toggle-enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, courseId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          // Revert optimistic update
          setEnrolled(wasEnrolled);
          setEnrolledCount(wasEnrolledCount);
          setUserCourseCount(wasUserCourseCount);
          Swal.fire({
            icon: "error",
            title: result.error.includes("Max course limit")
              ? "Course Limit Reached"
              : result.error.includes("Course not found")
              ? "Course Not Found"
              : "No Seats Left",
            text: result.error,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: result.action === "enrolled" ? "success" : "info",
            title: result.action === "enrolled" ? "Enrolled!" : "Unenrolled!",
            text:
              result.action === "enrolled"
                ? "You have successfully enrolled in the course."
                : "You have successfully unenrolled from the course.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });
          refreshDetails(); // Ensure latest data
        }
      })
      .catch(() => {
        // Revert on network error
        setEnrolled(wasEnrolled);
        setEnrolledCount(wasEnrolledCount);
        setUserCourseCount(wasUserCourseCount);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to process enrollment. Please try again.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const seatsLeft =
    course?.seats && enrolledCount !== undefined
      ? course.seats - enrolledCount
      : null;

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg text-purple-700"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 lg:px-0 my-5 lg:my-8 max-w-4xl mx-auto">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-60 object-cover border-2 border-purple-900 mb-6"
      />
      <title>AcademIQ | Details</title>
      <h2 className="text-3xl font-bold text-zinc-800 mb-2">{course.title}</h2>
      <p className="text-zinc-600 mb-4">{course.description}</p>
      <p className="text-sm text-purple-700 mb-4">
        Duration: {course.duration}
      </p>
      <p className="text-sm text-zinc-500 mb-6">
        Added by: {course.addedBy?.name || "Unknown"}
      </p>

      {/* Button logic */}
      {seatsLeft === null ? (
        <p className="text-zinc-500">Loading seats...</p>
      ) : seatsLeft <= 0 ? (
        <p className="text-red-500 font-semibold">No seats left</p>
      ) : !user ? (
        <button
          className="bg-gray-400 text-white font-semibold px-5 py-2 cursor-not-allowed"
          disabled
        >
          Login to Enroll ({seatsLeft} left)
        </button>
      ) : (
        <button
          onClick={handleEnrollToggle}
          className={`px-5 py-2 text-white font-semibold transition ${
            enrolled
              ? "bg-green-500 hover:bg-green-600"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
          disabled={userCourseCount >= 3 && !enrolled}
        >
          {enrolled ? "Unenroll" : `Enroll (${seatsLeft} left)`}
        </button>
      )}
    </div>
  );
};

export default CourseDetails;
