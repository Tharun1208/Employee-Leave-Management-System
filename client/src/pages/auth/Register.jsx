import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import Swal from "sweetalert2";
import { registerUser } from "../../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match",
      text: "Please enter the same password in both fields.",
      confirmButtonColor: "#2563eb",
    });
    return;
  }

  try {
    const response = await registerUser({
      name: formData.fullName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      password: formData.password,
      role: "employee",
    });

    await Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: response.data.message,
      confirmButtonColor: "#2563eb",
      timer: 2000,
      showConfirmButton: false,
    });

    setFormData({
      fullName: "",
      username: "",
      email: "",
      phone: "",
      department: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/login");

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: err.response?.data?.message || "Something went wrong.",
      confirmButtonColor: "#dc2626",
    });
  }
};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Section */}

        <div className="hidden md:flex bg-blue-700 text-white flex-col items-center justify-center p-12">

          <UserPlus size={80} />

          <h1 className="text-4xl font-bold mt-6 text-center">
            Employee Leave
            <br />
            Management System
          </h1>

          <p className="mt-6 text-blue-100 text-center leading-7">
            Create your employee account and start managing
            your leave requests quickly and securely.
          </p>

        </div>

        {/* Right Section */}

        <div className="p-10 overflow-y-auto">

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Employee Registration
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >{/* Full Name */}

            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

              </div>

            </div>

            {/* Username */}

            <div>

              <label className="block mb-2 font-medium">
                Username
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

              </div>

            </div>

            {/* Phone */}

            <div>

              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={20}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

              </div>

            </div>
            {/* Department */}

            <div>

              <label className="block mb-2 font-medium">
                Department
              </label>

              <div className="relative">

                <Building2
                  size={20}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">
                    Computer Science
                  </option>
                  <option value="Information Science">
                    Information Science
                  </option>
                  <option value="Electronics">
                    Electronics
                  </option>
                  <option value="Mechanical">
                    Mechanical
                  </option>
                  <option value="Civil">
                    Civil
                  </option>
                </select>

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 font-medium">
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
                  className="w-full border rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-3.5"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}

          <p className="text-center mt-8 text-gray-600">
            Already have an account?

            <Link
              to="/login"
              className="text-blue-700 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;