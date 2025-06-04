import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json"; // 👈 Import your JSON file
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, setLoading } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    setLoading(true);

    if (password !== confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password Not Matched!!",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);

        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            console.log("Profile updated");
          })
          .catch((err) => {
            console.error("Error updating profile:", err.message);
          });

        console.log("User created:", user);
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
    <div className="min-h-screen my-10 flex flex-col lg:flex-row items-center justify-center gap-10 px-4">
      {/* Lottie Animation Section */}
      <div className="w-full lg:w-1/3">
        <Lottie animationData={registerAnimation} loop={true} />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-2/3 sm:w-[80%] md:w-[60%] xl:w-[40%]">
        <title>AcademIQ | Register</title>

        <form
          onSubmit={handleRegister}
          className="p-6 bg-white shadow-md rounded-lg space-y-5"
        >
          <h2 className="text-2xl font-semibold text-center text-zinc-800">
            Create Your Account
          </h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="Paste your photo URL"
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Submit */}
          <input
            type="submit"
            value="Register"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-200"
          />

          <p className="text-sm text-center text-zinc-700">
            Already have an account?
            <Link
              to="/login"
              className="text-purple-700 hover:underline font-medium ml-1 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
