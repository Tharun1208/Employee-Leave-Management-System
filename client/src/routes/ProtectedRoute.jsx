import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {

    if (user?.role === "manager") {
      return <Navigate to="/manager/dashboard" />;
    }

    return <Navigate to="/employee/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;