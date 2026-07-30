import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Employee Pages
import Dashboard from "../pages/employee/Dashboard";
import ApplyLeave from "../pages/employee/ApplyLeave";
import LeaveHistory from "../pages/employee/LeaveHistory";
import Notifications from "../pages/employee/Notifications";
import EmployeeProfile from "../pages/employee/Profile";

// Manager Pages
import ManagerDashboard from "../pages/manager/Dashboard";
import Employees from "../pages/manager/Employees";
import LeaveRequests from "../pages/manager/LeaveRequests";
import ManagerNotifications from "../pages/manager/Notifications";
import ManagerProfile from "../pages/manager/ManagerProfile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee Routes */}

        <Route
          path="/employee/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/employee/apply-leave"
          element={<ApplyLeave />}
        />

        <Route
          path="/employee/history"
          element={<LeaveHistory />}
        />

        <Route
          path="/employee/notifications"
          element={<Notifications />}
        />

        <Route
          path="/employee/profile"
          element={<EmployeeProfile />}
        />

        {/* Manager Routes */}

        <Route
          path="/manager/dashboard"
          element={<ManagerDashboard />}
        />

        <Route
          path="/manager/employees"
          element={<Employees />}
        />

        <Route
          path="/manager/leave-requests"
          element={<LeaveRequests />}
        />

        <Route
          path="/manager/notifications"
          element={<ManagerNotifications />}
        />

        <Route
          path="/manager/profile"
          element={<ManagerProfile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;