import { useEffect, useState } from "react";
import { Bell, CheckCircle, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import { getNotifications, markNotificationRead, deleteNotification } from "../../api/notificationApi";
import { toast } from "react-toastify";

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [bellAnimate, setBellAnimate] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      toast.error("Failed to load notifications");
    }
  };

  const animateBell = () => {
    setBellAnimate(true);
    setTimeout(() => {
      setBellAnimate(false);
    }, 800);
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(
        notifications.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: 1 }
            : notification
        )
      );
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to update notification");
    }
  };

  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications(
        notifications.filter(
          (notification) => notification.id !== id
        )
      );
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <ManagerSidebar />
      <div className="flex-1 min-w-0">
        <main className="p-4 sm:p-6 lg:p-8">
          <div
            onMouseEnter={animateBell}
            onClick={animateBell}
            className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex items-center justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
          >
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
                Notifications 🔔
              </h1>
              <p className="mt-2 text-blue-100 text-sm sm:text-base">
                Stay updated with employee leave activities and important updates.
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-white/20 backdrop-blur-md items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Bell
                size={40}
                className={`transition-all duration-300 ${bellAnimate ? "animate-bounce" : ""
                  }`}
              />
            </div>
          </div>
          <div className="space-y-5 sm:space-y-6">
            {
              notifications.length === 0
                ?
                (
                  <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 sm:p-16 text-center transition-all duration-300 hover:shadow-2xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">
                      No Notifications
                    </h2>
                    <p className="text-gray-500 mt-3 text-base sm:text-lg">
                      You're all caught up.
                    </p>
                  </div>
                )
                :
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-3xl shadow-xl border p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300 ${notification.is_read
                        ? "border-slate-200"
                        : "border-blue-400 bg-blue-50/50"
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                          Leave Status Update
                        </h2>
                        <p className="text-gray-600 mt-2 leading-relaxed text-sm sm:text-base break-words">
                          {notification.message}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 mt-3">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                      {
                        !notification.is_read &&
                        <span className="self-start bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow">
                          NEW
                        </span>
                      }
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t">
                      <button
                        onClick={() => navigate("/manager/leave-requests")}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white px-5 py-2.5 rounded-xl shadow transition-all duration-300 w-full sm:w-auto"
                      >
                        <Eye size={18} />
                        View Requests
                      </button>
                      {
                        !notification.is_read &&
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-5 py-2.5 rounded-xl shadow transition-all duration-300 w-full sm:w-auto"
                        >
                          <CheckCircle size={18} />
                          Mark Read
                        </button>
                      }
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 hover:scale-105 text-white px-5 py-2.5 rounded-xl shadow transition-all duration-300 w-full sm:w-auto"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            }
          </div>
        </main>
      </div>
    </div>
  );
}
export default Notifications;