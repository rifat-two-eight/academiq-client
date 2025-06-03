import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../assets/error.json"; // make sure path is correct

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-zinc-50 text-zinc-800">
      <title>AcademIQ | Page Not Found</title>

      <Lottie animationData={animationData} loop className="w-72 md:w-96" />

      <h2 className="text-3xl font-bold mt-6 text-purple-700">
        Oops! Page Not Found
      </h2>
      <p className="text-center mt-2 max-w-md">
        The page you’re looking for doesn’t exist or was moved. Let’s get you
        back to learning!
      </p>

      <Link to="/" className="mt-6">
        <button className="bg-purple-700 cursor-pointer hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded-md transition duration-200">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
