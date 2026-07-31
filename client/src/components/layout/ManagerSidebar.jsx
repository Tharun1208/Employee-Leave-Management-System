import { LayoutDashboard, Users, ClipboardList, Bell, User, LogOut, PanelLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ManagerSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("managerSidebar") !== "closed"
  );
  const [clickedIcon, setClickedIcon] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "managerSidebar",
      isOpen ? "open" : "closed"
    );
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("managerSidebar");
    navigate("/login");
  };

  const handleIconClick = (path) => {
    setClickedIcon(path);

    setTimeout(() => {
      setClickedIcon(null);
    }, 800);
  };

  const menuItems = [
    {
      path: "/manager/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard"
    },
    {
      path: "/manager/employees",
      icon: Users,
      label: "Employees"
    },
    {
      path: "/manager/leave-requests",
      icon: ClipboardList,
      label: "Leave Requests"
    },
    {
      path: "/manager/notifications",
      icon: Bell,
      label: "Notifications"
    },
    {
      path: "/manager/profile",
      icon: User,
      label: "Profile"
    }
  ];

  return (
    <aside
      className={`
        ${isOpen ? "w-64" : "w-20"}
        min-h-screen
        bg-gradient-to-b
        from-blue-800
        via-blue-700
        to-indigo-800
        text-white
        shadow-2xl
        flex
        flex-col
        transition-all
        duration-300
        shrink-0
      `}
    >
      <div className="h-16 flex items-center px-3 border-b border-blue-600">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300"
        >
          <PanelLeft
            size={26}
            className="transition-transform duration-500 hover:rotate-180"
          />
          {isOpen && (
            <span className="text-lg font-bold tracking-wide">
              Manager
            </span>
          )}
        </button>
      </div>

      <nav className="mt-6 flex flex-col gap-3 px-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseDown={() => handleIconClick(item.path)}
              className={({ isActive }) => `
                flex
                items-center
                ${isOpen ? "px-4" : "justify-center"}
                py-3
                rounded-xl
                transition-all
                duration-300
                overflow-hidden
                ${
                  isActive
                    ? "bg-white text-blue-700 shadow-lg font-semibold scale-[1.03]"
                    : "hover:bg-white/10 hover:translate-x-1"
                }
              `}
            >
              <Icon
                size={22}
                className={`
                  shrink-0
                  transition-all
                  duration-500
                  ${
                    clickedIcon === item.path
                      ? "animate-bounce scale-125 rotate-12"
                      : ""
                  }
                `}
              />

              {isOpen && (
                <span className="ml-3 whitespace-nowrap text-sm sm:text-base">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 sm:p-4 border-t border-blue-600">
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-red-600
            hover:bg-red-700
            hover:scale-105
            py-3
            rounded-xl
            transition-all
            duration-300
            shadow-lg
          "
        >
          <LogOut
            size={20}
            className="transition-transform duration-500 hover:rotate-180"
          />

          {isOpen && (
            <span className="font-semibold">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default ManagerSidebar;