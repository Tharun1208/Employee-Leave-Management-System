import { useState } from "react";
import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  Bell,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } min-h-screen bg-blue-700 text-white shadow-lg flex flex-col transition-all duration-300`}
    >

      {/* Menu Header */}

      <div className="h-16 flex items-center px-4 border-b border-blue-600">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 hover:bg-blue-600 px-3 py-2 rounded-lg transition w-full"
        >
          <Menu size={26} />

          {isOpen && (
            <span className="text-lg font-semibold">
              Menu
            </span>
          )}

        </button>

      </div>

      {/* Navigation */}

      <nav className="mt-6 flex flex-col gap-2 px-2 flex-1">

        <NavLink
          to="/employee/dashboard"
          className={({ isActive }) =>
            `flex items-center ${
              isOpen ? "px-4" : "justify-center"
            } py-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <LayoutDashboard size={22} />
          {isOpen && <span className="ml-3">Dashboard</span>}
        </NavLink>

        <NavLink
          to="/employee/apply-leave"
          className={({ isActive }) =>
            `flex items-center ${
              isOpen ? "px-4" : "justify-center"
            } py-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <CalendarPlus size={22} />
          {isOpen && <span className="ml-3">Apply Leave</span>}
        </NavLink>

        <NavLink
          to="/employee/history"
          className={({ isActive }) =>
            `flex items-center ${
              isOpen ? "px-4" : "justify-center"
            } py-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <ClipboardList size={22} />
          {isOpen && <span className="ml-3">Leave History</span>}
        </NavLink>

        <NavLink
          to="/employee/notifications"
          className={({ isActive }) =>
            `flex items-center ${
              isOpen ? "px-4" : "justify-center"
            } py-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <Bell size={22} />
          {isOpen && <span className="ml-3">Notifications</span>}
        </NavLink>

        <NavLink
          to="/employee/profile"
          className={({ isActive }) =>
            `flex items-center ${
              isOpen ? "px-4" : "justify-center"
            } py-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <User size={22} />
          {isOpen && <span className="ml-3">Profile</span>}
        </NavLink>

      </nav>

      {/* Logout */}

      <div className="p-4">

        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            isOpen ? "justify-center gap-2" : "justify-center"
          } bg-red-600 hover:bg-red-700 py-3 rounded-xl transition`}
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;