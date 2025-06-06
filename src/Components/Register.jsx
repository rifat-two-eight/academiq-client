import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ for navigation
import { AuthContext } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, setLoading, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    setLoading(true);

    // ✅ Password validations
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("One special character");
    if (password.includes(email)) errors.push("Cannot contain your email");
    if (password !== confirmPassword) errors.push("Passwords do not match");

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        html: `<ul class="text-left">${errors
          .map((e) => `<li>• ${e}</li>`)
          .join("")}</ul>`,
        confirmButtonColor: "#7319c1",
      });
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          setUser({ ...user, displayName: name, photoURL }); // ✅ update context
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen my-10 flex flex-col lg:flex-row items-center justify-center gap-10 px-4">
      <div className="w-full lg:w-1/3">
        <Lottie animationData={registerAnimation} loop={true} />
      </div>

      <div className="w-full lg:w-2/3 sm:w-[80%] md:w-[60%] xl:w-[40%]">
        <title>AcademIQ | Register</title>
        <form
          onSubmit={handleRegister}
          className="p-6 bg-white shadow-md space-y-5"
        >
          <h2 className="text-2xl font-semibold text-center text-zinc-800">
            Create Your Account
          </h2>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-zinc-300 focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="Paste your photo URL"
              required
              className="w-full px-4 py-2 border border-zinc-300 focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-zinc-300 focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              className="w-full px-4 py-2 border border-zinc-300 focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              className="w-full px-4 py-2 border border-zinc-300 focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <input
            type="submit"
            value="Register"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 cursor-pointer transition duration-200"
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
