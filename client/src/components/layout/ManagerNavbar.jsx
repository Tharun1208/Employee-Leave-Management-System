import { UserCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ManagerNavbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const managerName = user?.name || "Manager";
  const managerEmail = user?.email || "manager@gmail.com";

  return (
    <header className="h-16 sm:h-20 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-lg flex items-center justify-between px-3 sm:px-6 lg:px-10 sticky top-0 z-50">
      <div className="min-w-0 ml-12 sm:ml-12 lg:ml-0">
        <h1 className="text-sm sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent truncate">
          Employee Leave Management System
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Manager Dashboard
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => navigate("/manager/profile")}
          className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:shadow-md group"
        >
          <div className="relative">
            <UserCircle
              size={38}
              className="sm:w-11 sm:h-11 text-blue-700 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="hidden md:block text-left max-w-[160px]">
            <h3 className="font-bold text-sm lg:text-base text-slate-800 group-hover:text-blue-700 transition truncate">
              {managerName}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {managerEmail}
            </p>
          </div>
          <ChevronDown
            size={18}
            className="hidden sm:block text-gray-500 transition-transform duration-300 group-hover:rotate-180"
          />
        </button>
      </div>
    </header>
  );
}

export default ManagerNavbar;