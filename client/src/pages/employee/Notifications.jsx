import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
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
      return <CheckCircle className="text-green-600" size={30} />;
    }

    if (message.toLowerCase().includes("rejected")) {
      return <XCircle className="text-red-600" size={30} />;
    }

    return <Clock className="text-yellow-500" size={30} />;
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="flex items-center gap-3 mb-8">

            <Bell className="text-blue-700" size={35} />

            <h1 className="text-3xl font-bold">
              Notifications
            </h1>

          </div>

          <div className="space-y-5">

            {notifications.length > 0 ? (

              notifications.map((notification) => (

                <div
                  key={notification.id}
                  className="bg-white rounded-xl shadow-md p-5 flex items-start gap-5 hover:shadow-lg transition"
                >

                  {getIcon(notification.message)}

                  <div className="flex-1">

                    <h2 className="text-lg font-semibold">
                      Notification
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {notification.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-3">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>

                  </div>

                </div>

              ))

            ) : (

              <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                No notifications found.
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Notifications;