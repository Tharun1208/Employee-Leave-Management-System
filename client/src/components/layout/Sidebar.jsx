import { useState } from "react";
import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  Bell,
  User,
  LogOut,
  PanelLeft
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("employeeSidebar") !== "closed"
  );

  const [clickedIcon, setClickedIcon] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
    localStorage.setItem(
      "employeeSidebar",
      !isOpen ? "open" : "closed"
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("employeeSidebar");
    navigate("/login");
  };

  const animateIcon = (name) => {
    setClickedIcon(name);

    setTimeout(() => {
      setClickedIcon("");
    }, 600);
  };

  const menuItems = [
    {
      path: "/employee/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      path: "/employee/apply-leave",
      label: "Apply Leave",
      icon: CalendarPlus
    },
    {
      path: "/employee/history",
      label: "Leave History",
      icon: ClipboardList
    },
    {
      path: "/employee/notifications",
      label: "Notifications",
      icon: Bell
    },
    {
      path: "/employee/profile",
      label: "Profile",
      icon: User
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
      duration-500
      ease-in-out
      `}
    >
      <div className="h-16 flex items-center px-4 border-b border-blue-600">
        <button
          onClick={handleToggle}
          className="
          flex
          items-center
          gap-3
          w-full
          px-3
          py-2
          rounded-xl
          hover:bg-white/10
          transition-all
          duration-300
          "
        >
          <PanelLeft
            size={26}
            className={`
            transition-all
            duration-500
            ${!isOpen ? "rotate-180" : ""}
            `}
          />

          {
            isOpen &&
            (
              <span className="text-lg font-bold tracking-wide">
                Menu
              </span>
            )
          }
        </button>
      </div>

      <nav className="mt-6 flex flex-col gap-3 px-3 flex-1">
        {
          menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => animateIcon(item.label)}
                className={({isActive}) =>
                  `
                  flex
                  items-center
                  ${isOpen ? "px-4" : "justify-center"}
                  py-3
                  rounded-xl
                  transition-all
                  duration-300
                  ${
                    isActive
                    ?
                    "bg-white text-blue-700 shadow-lg font-semibold scale-105"
                    :
                    "hover:bg-white/10 hover:translate-x-1"
                  }
                  `
                }
              >

                <Icon
                  size={22}
                  className={`
                  transition-all
                  duration-500
                  ${
                    clickedIcon === item.label
                    ?
                    "animate-bounce rotate-12 scale-125"
                    :
                    ""
                  }
                  `}
                />

                {
                  isOpen &&
                  (
                    <span className="ml-3 whitespace-nowrap">
                      {item.label}
                    </span>
                  )
                }

              </NavLink>
            );

          })
        }
      </nav>

      <div className="p-4 border-t border-blue-600">
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
            className="
            transition-transform
            duration-500
            hover:rotate-180
            "
          />

          {
            isOpen &&
            (
              <span className="font-semibold">
                Logout
              </span>
            )
          }

        </button>
      </div>

    </aside>
  );
}

export default Sidebar;