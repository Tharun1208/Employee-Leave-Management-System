import { UserCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ManagerNavbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const managerName = user?.name || "Manager";
  const managerEmail = user?.email || "manager@gmail.com";

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 lg:px-8">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-lg lg:text-2xl font-bold text-slate-800">
          Employee Leave Management System
        </h1>
        <p className="text-xs lg:text-sm text-gray-500">
          Manager Dashboard
        </p>
      </div>
      <div className="flex items-center gap-3 lg:gap-6">
        <button
          onClick={() => navigate("/manager/profile")}
          className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-xl hover:bg-slate-100 transition"
        >
          <UserCircle
            size={42}
            className="text-blue-700"
          />
          <div className="text-left hidden sm:block">
            <h3 className="font-semibold text-slate-800">
              {managerName}
            </h3>
            <p className="text-sm text-gray-500">
              {managerEmail}
            </p>
          </div>
          <ChevronDown
            size={18}
            className="text-gray-500 hidden sm:block"
          />
        </button>
      </div>
    </header>
  );
}

export default ManagerNavbar;