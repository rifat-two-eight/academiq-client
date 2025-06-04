import { FaGithub, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-5 md:px-16">
      <div className="flex flex-col items-center justify-center gap-3 text-center mb-8">
        <div className="flex gap-1 items-center">
          <img className="w-14" src="/logo2.png" alt="Logo" />
          <h2 className="text-2xl font-semibold">
            Academ<span className="text-purple-700">IQ</span>
          </h2>
        </div>
        <ul className="flex flex-col lg:flex-row gap-5 text-gray-300">
          <li>
            <NavLink className="text-gray-300" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="text-gray-300" to="/courses">
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink className="text-gray-300" to="/addcourse">
              Add Course
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0 border-t border-gray-500 pt-6 pb-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-1">Contact Us</h3>
          <p className="text-md text-gray-300">Email: support@academiq.com</p>
          <p className="text-md text-gray-300">Phone: +123 456 2828</p>
        </div>
        <div className="flex gap-5 text-gray-300">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/@atiqurrahmanrifat7805"
            className="hover:text-red-500 transition duration-300"
          >
            <FaYoutube size={26} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://web.telegram.org/"
            className="hover:text-blue-400 transition duration-300"
          >
            <FaTelegramPlane size={26} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/rifat-two-eight"
            className="hover:text-gray-400 transition duration-300"
          >
            <FaGithub size={26} />
          </a>
        </div>
      </div>

      <div className="text-center text-md text-gray-400 mt-6">
        © {new Date().getFullYear()} AcademIQ. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
