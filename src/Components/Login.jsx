import { Link, Navigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { use, useState } from "react";
import loginAnimation from "../assets/login.json"; // 👈 Import your JSON file
import Lottie from "lottie-react";
import { AuthContext } from "../Context/AuthContext";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, setLoading, googleLogin, githubLogin } = use(AuthContext);
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    googleLogin(googleProvider)
      .then((res) => {
        console.log(res.user);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      });
  };
  const handleGithubLogin = (e) => {
    e.preventDefault();
    const githubProvider = new GithubAuthProvider();
    githubLogin(githubProvider)
      .then((res) => {
        console.log(res.user);
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
        setLoading(false);
        e.target.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      });
  };
  return (
    <div className="min-h-screen mb-8 lg:mb-0 flex flex-col lg:flex-row items-center justify-center px-4 ">
      <div className="w-full lg:w-1/3">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>
      <div className="w-full lg:w-2/3 sm:w-[80%] md:w-[60%] xl:w-[40%]">
        <title>AcademIQ | Login</title>

        <form
          onSubmit={handleLogin}
          className="p-6 bg-white shadow-md rounded-lg space-y-5"
        >
          <h2 className="text-2xl font-semibold text-center text-zinc-800">
            Login to Your Account
          </h2>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 pr-10 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-600 hover:text-purple-700 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="-mt-2 text-right">
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <input
            type="submit"
            value="Login"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-200"
          />

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-zinc-300 cursor-pointer hover:border-purple-700 text-zinc-700 hover:text-purple-700 font-medium py-2 px-4 rounded-md transition duration-200"
          >
            <FaGoogle className="text-lg" />
            Login with Google
          </button>
          <button
            onClick={handleGithubLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-zinc-300 cursor-pointer hover:border-purple-700 text-zinc-700 hover:text-purple-700 font-medium py-2 px-4 rounded-md transition duration-200"
          >
            <FaGithub className="text-lg" />
            Login with Github
          </button>

          <p className="text-zinc-700 text-sm text-center">
            New to AcademIQ?
            <Link
              to="/register"
              className="text-purple-700 font-medium hover:underline ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
