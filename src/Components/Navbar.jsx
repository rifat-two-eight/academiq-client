import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser, setLoading } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink className="text-zinc-800" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="text-zinc-800" to="/courses" end>
          Courses
        </NavLink>
      </li>
      <li>
        <NavLink className="text-zinc-800" to="/addcourse">
          Add Course
        </NavLink>
      </li>
      <li>
        <NavLink className="text-zinc-800" to="/managecourses">
          Manage Courses
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    setLoading(true);
    logOutUser()
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="navbar fixed top-0 z-50 shadow-sm bg-white text-zinc-800 lg:px-5 w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 -me-3 -ms-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white text-zinc-800 dark:text-zinc-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex gap-1 items-center">
          <img className="w-14" src="/logo2.png" alt="Logo" />
          <h2 className="text-2xl font-semibold hidden lg:flex">
            Academ<span className="text-purple-700">IQ</span>
          </h2>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end space-x-4">
        {!user ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-semibold underline"
                  : "text-zinc-800 cursor-pointer hover:text-purple-700 font-medium transition duration-150"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-semibold underline me-3 lg:me-0"
                  : "text-zinc-800 cursor-pointer me-3 lg:me-0 hover:text-purple-700 font-medium transition duration-150"
              }
            >
              Register
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2 border-purple-700">
                <img
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="font-bold text-gray-800 text-center">
                  {user.displayName || "User"}
                </span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-purple-700 font-semibold flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
