import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Layout/Root";
import Error from "./Components/Error";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AuthProvider from "./Context/AuthProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCourse from "./Components/AddCourse";
import Courses from "./Components/Courses";
import CourseDetails from "./Components/CourseDetails";
import PrivateRoute from "./Components/PrivateRoute";
import ManageCourses from "./Components/ManageCourses";
import EditCourse from "./Components/EditCourse";
import MyEnrolledCourses from "./Components/MyEnrolledCourses";
import Instructors from "./Components/Instructors";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <Root></Root>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/addcourse",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/courses",
        loader: () => fetch("http://localhost:3000/courses"),
        Component: Courses,
      },
      {
        path: "/courses/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/courses/${params.id}`),
        Component: CourseDetails,
      },
      {
        path: "/managecourses",
        element: (
          <PrivateRoute>
            <ManageCourses></ManageCourses>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-course/:id",
        element: (
          <PrivateRoute>
            <EditCourse></EditCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-courses",
        element: (
          <PrivateRoute>
            <MyEnrolledCourses></MyEnrolledCourses>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/instructors",
        Component: Instructors,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
