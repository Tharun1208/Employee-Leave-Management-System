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
  Building2
} from "lucide-react";
import Swal from "sweetalert2";
import { registerUser } from "../../api/authApi";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialForm = {
    fullName: "",
    username: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please enter the same password in both fields.",
        confirmButtonColor: "#2563eb"
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
        role: "employee"
      });

      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false
      });

      setFormData(initialForm);

      navigate("/login");

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong.",
        confirmButtonColor: "#dc2626"
      });

    }

  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 transition-all duration-500 hover:shadow-2xl">

        <div className="hidden md:flex bg-gradient-to-br from-blue-700 to-indigo-700 text-white flex-col justify-center items-center p-8">

          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 hover:rotate-6">

            <UserPlus size={55}/>

          </div>

          <h1 className="text-3xl font-bold mt-5 text-center">
            Employee Leave
          </h1>

          <h1 className="text-3xl font-bold text-center">
            Management System
          </h1>

          <p className="mt-5 text-blue-100 text-center leading-6 max-w-sm">
            Create your employee account and manage your leave requests securely.
          </p>

        </div>


        <div className="p-5 sm:p-6 lg:p-7">

          <div className="text-center">

            <h2 className="text-3xl font-bold text-slate-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-1">
              Employee Registration
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="mt-5 space-y-3"
          >
                        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="fullName"
                  autoComplete="off"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-3 py-2 transition-all duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

              </div>
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Username
              </label>

              <div className="relative">

                <User
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-3 py-2 transition-all duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

              </div>
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-3 py-2 transition-all duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

              </div>
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  autoComplete="off"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-3 py-2 transition-all duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

              </div>
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Department
              </label>

              <div className="relative">

                <Building2
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <select
                  name="department"
                  autoComplete="off"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-3 py-2 transition-all duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >

                  <option value="">
                    Select Department
                  </option>

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
                        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-10 py-2 transition-all duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-blue-700 transition"
                >
                  {
                    showPassword
                      ? <EyeOff size={17}/>
                      : <Eye size={17}/>
                  }
                </button>

              </div>
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-10 py-2 transition-all duration-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-blue-700 transition"
                >
                  {
                    showConfirmPassword
                      ? <EyeOff size={17}/>
                      : <Eye size={17}/>
                  }
                </button>

              </div>
            </div>


            <div className="pt-5">

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Create Account
              </button>

            </div>


          </form>


          <div className="text-center mt-5">

            <p className="text-gray-600">

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

    </div>

  );

}

export default Register;