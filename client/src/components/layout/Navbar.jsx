import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const employeeName = user?.name || "Employee";

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold text-blue-700">
          Employee Leave Management System
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/employee/profile")}
          className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
        >
          <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">
              {employeeName}
            </h3>
            <p className="text-sm text-gray-500">
              View Profile
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
export default Navbar;