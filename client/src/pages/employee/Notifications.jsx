import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { Bell, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { getNotifications } from "../../api/notificationApi";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch (error) {
      toast.error("Failed to load notifications");
    }
  };

  const getIcon = (message) => {
    if (message.toLowerCase().includes("approved")) {
      return <CheckCircle className="text-green-600" size={32} />;
    }

    if (message.toLowerCase().includes("rejected")) {
      return <XCircle className="text-red-600" size={32} />;
    }

    return <Clock className="text-yellow-500" size={32} />;
  };

  const getBorder = (message) => {
    if (message.toLowerCase().includes("approved")) {
      return "border-green-500";
    }

    if (message.toLowerCase().includes("rejected")) {
      return "border-red-500";
    }

    return "border-yellow-500";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="group bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl shadow-2xl p-5 sm:p-8 text-white mb-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/40">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-4xl font-bold">
                  Notifications
                </h1>
                <p className="mt-2 text-blue-100 text-sm sm:text-lg">
                  Stay updated with your leave request status.
                </p>
              </div>
              <div className="hidden sm:flex w-20 h-20 rounded-full bg-white/20 items-center justify-center backdrop-blur-sm transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Bell
                  size={42}
                  className="transition-transform duration-500 group-hover:scale-125"
                />
              </div>
            </div>
          </div>
          <div className="space-y-5 sm:space-y-6">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-3xl shadow-lg border-l-8 ${getBorder(notification.message)} p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  <div className="flex items-start gap-3 sm:gap-5">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center transition-all duration-300 hover:bg-blue-100 hover:scale-110">
                      {getIcon(notification.message)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                          Leave Notification
                        </h2>
                        <span className="text-xs sm:text-sm text-gray-500 bg-slate-100 px-3 sm:px-4 py-2 rounded-full w-fit">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-lg mt-3 leading-7 break-words">
                        {notification.message}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-4">
                        Received on {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-16 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                  <Bell size={40} className="sm:w-[50px] sm:h-[50px] text-blue-700" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">
                  No Notifications
                </h2>
                <p className="text-gray-500 mt-3 text-sm sm:text-lg">
                  You don't have any notifications yet.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Notifications;