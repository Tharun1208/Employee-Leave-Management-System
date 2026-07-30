import { useEffect,useState } from "react";
import { Bell,CheckCircle,Trash2,Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ManagerNavbar from "../../components/layout/ManagerNavbar";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import { getNotifications,markNotificationRead,deleteNotification } from "../../api/notificationApi";
import { toast } from "react-toastify";
function Notifications(){
  const navigate=useNavigate();
  const [notifications,setNotifications]=useState([]);
  useEffect(()=>{
    fetchNotifications();
  },[]);
  const fetchNotifications=async()=>{
    try{
      const response=await getNotifications();
      setNotifications(response.data);
    }catch(error){
      toast.error("Failed to load notifications");
    }
  };
  const markAsRead=async(id)=>{
    try{
      await markNotificationRead(id);
      setNotifications(
        notifications.map((notification)=>
          notification.id===id
          ? {...notification,is_read:1}
          : notification
        )
      );
      toast.success("Notification marked as read");
    }catch(error){
      toast.error("Failed to update notification");
    }
  };
  const removeNotification=async(id)=>{
    try{
      await deleteNotification(id);
      setNotifications(
        notifications.filter(
          notification=>notification.id!==id
        )
      );
      toast.success("Notification deleted");
    }catch(error){
      toast.error("Failed to delete notification");
    }
  };
  return(
    <div className="flex min-h-screen bg-slate-100">
      <ManagerSidebar/>
      <div className="flex-1">
        <ManagerNavbar/>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Notifications
          </h1>
          <p className="text-gray-500 mt-2 mb-8">
            View employee leave notifications.
          </p>
          <div className="space-y-5">
            {
              notifications.length===0
              ?
              (
                <div className="bg-white rounded-2xl shadow p-12 text-center">
                  <Bell size={60} className="mx-auto text-gray-400 mb-4"/>
                  <h2 className="text-2xl font-semibold text-gray-600">
                    No Notifications
                  </h2>
                  <p className="text-gray-500 mt-2">
                    You're all caught up.
                  </p>
                </div>
              )
              :
              notifications.map((notification)=>(
                <div
                  key={notification.id}
                  className={`rounded-2xl shadow-md p-6 transition hover:shadow-xl ${
                    notification.is_read
                    ?"bg-white"
                    :"bg-blue-50 border-l-4 border-blue-600"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <Bell className={notification.is_read?"text-gray-500":"text-blue-700"}/>
                      <div>
                        <h2 className="text-xl font-semibold">
                          Leave Status Update
                        </h2>
                        <p className="text-gray-700 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {
                      !notification.is_read &&
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        New
                      </span>
                    }
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={()=>navigate("/manager/leave-requests")}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      <Eye size={18}/>
                      View Requests
                    </button>
                    {
                      !notification.is_read &&
                      <button
                        onClick={()=>markAsRead(notification.id)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        <CheckCircle size={18}/>
                        Mark Read
                      </button>
                    }
                    <button
                      onClick={()=>removeNotification(notification.id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      <Trash2 size={18}/>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default Notifications;