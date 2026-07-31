import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";

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

        {/* Authentication Routes */}

        <Route 
          path="/" 
          element={<Login />} 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route 
          path="/register" 
          element={<Register />} 
        />



        {/* Employee Protected Routes */}


        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/employee/apply-leave"
          element={
            <ProtectedRoute role="employee">
              <ApplyLeave />
            </ProtectedRoute>
          }
        />


        <Route
          path="/employee/history"
          element={
            <ProtectedRoute role="employee">
              <LeaveHistory />
            </ProtectedRoute>
          }
        />


        <Route
          path="/employee/notifications"
          element={
            <ProtectedRoute role="employee">
              <Notifications />
            </ProtectedRoute>
          }
        />


        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute role="employee">
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />



        {/* Manager Protected Routes */}


        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/manager/employees"
          element={
            <ProtectedRoute role="manager">
              <Employees />
            </ProtectedRoute>
          }
        />


        <Route
          path="/manager/leave-requests"
          element={
            <ProtectedRoute role="manager">
              <LeaveRequests />
            </ProtectedRoute>
          }
        />


        <Route
          path="/manager/notifications"
          element={
            <ProtectedRoute role="manager">
              <ManagerNotifications />
            </ProtectedRoute>
          }
        />


        <Route
          path="/manager/profile"
          element={
            <ProtectedRoute role="manager">
              <ManagerProfile />
            </ProtectedRoute>
          }
        />


        {/* Invalid Route */}

        <Route
          path="*"
          element={<Login />}
        />


      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;