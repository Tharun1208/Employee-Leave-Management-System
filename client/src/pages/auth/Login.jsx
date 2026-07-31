import { useEffect, useState } from "react";
import { Eye, EyeOff, User, Lock, CalendarDays } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
    setShowPassword(false);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful");

      setTimeout(() => {
        if (res.data.user.role === "manager") {
          navigate("/manager/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      }, 1000);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white">

        <div className="hidden md:flex relative bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 text-white flex-col justify-center items-center p-12 overflow-hidden">

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20"></div>

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -bottom-20 -right-20"></div>

          <div className="relative z-10 text-center">

            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-xl animate-pulse">

              <CalendarDays
                size={80}
                className="text-white"
              />

            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold mt-8 tracking-wide">
              Employee Leave
            </h1>

            <h1 className="text-3xl lg:text-4xl font-extrabold">
              Management System
            </h1>

            <p className="mt-6 text-blue-100 leading-8 text-lg">
              Apply, track and manage employee leave requests through one secure and easy-to-use portal.
            </p>

          </div>

        </div>
        <div className="p-6 sm:p-8 md:p-10 lg:p-14">

          <div className="text-center">

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-3 text-base sm:text-lg">
              Sign in to continue
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-10 space-y-6 sm:space-y-7"
          >

            <div>

              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>

              <div className="relative group">

                <User
                  size={21}
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-700 transition"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-blue-400"
                  required
                />

              </div>

            </div>


            <div>

              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <div className="relative group">

                <Lock
                  size={21}
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-700 transition"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3.5 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-blue-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-blue-700 transition"
                >

                  {
                    showPassword
                      ?
                      <EyeOff size={21} />
                      :
                      <Eye size={21} />
                  }

                </button>

              </div>

            </div>


            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-400/50 hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              Login
            </button>

          </form>
          <div className="text-center mt-8">

            <p className="text-gray-600">

              New Employee?

              <Link
                to="/register"
                className="text-blue-700 font-bold ml-2 hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );

}

export default Login;