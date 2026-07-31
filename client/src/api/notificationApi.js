import axios from "axios";

const API = "https://employee-leave-management-system-ug86.onrender.com/api/notifications";

const authHeader = () => ({
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
});


// Get notifications
export const getNotifications = () =>
  axios.get(
    API,
    authHeader()
  );


// Get unread notification count
export const getUnreadCount = () =>
  axios.get(
    `${API}/unread-count`,
    authHeader()
  );


// Mark notification as read
export const markNotificationRead = (id) =>
  axios.put(
    `${API}/read/${id}`,
    {},
    authHeader()
  );


// Delete notification
export const deleteNotification = (id) =>
  axios.delete(
    `${API}/${id}`,
    authHeader()
  );