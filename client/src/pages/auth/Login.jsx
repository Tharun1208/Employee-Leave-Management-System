import { useState } from "react";
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

      localStorage.setItem("token", res.data.token);

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
        err.response?.data?.message || "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        <div className="hidden md:flex bg-blue-700 text-white flex-col justify-center items-center p-12">
          <CalendarDays size={80} />

          <h1 className="text-4xl font-bold mt-6">
            Employee Leave
          </h1>

          <h1 className="text-4xl font-bold">
            Management System
          </h1>

          <p className="mt-6 text-center text-blue-100 leading-7">
            Apply, track and manage employee leave requests
            through one secure and easy-to-use portal.
          </p>
        </div>

        <div className="p-10">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition duration-300"
            >
              Login
            </button>

          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              New Employee?
              <Link
                to="/register"
                className="text-blue-700 font-semibold ml-2 hover:underline"
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