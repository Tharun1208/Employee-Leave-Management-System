import { useEffect, useState } from "react";
import ManagerNavbar from "../../components/layout/ManagerNavbar";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { getEmployeesCount, getAllLeaves } from "../../api/dashboardApi";
function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [recentLeaves, setRecentLeaves] = useState([]);
  useEffect(() => {
    fetchDashboard();
  }, []);
  const fetchDashboard = async () => {
    try {
      const employeeResponse = await getEmployeesCount();
      const leaveResponse = await getAllLeaves();
      const employees = Array.isArray(employeeResponse.data)
        ? employeeResponse.data
        : [];
      const leaves = Array.isArray(leaveResponse.data)
        ? leaveResponse.data
        : [];
      const pending = leaves.filter(
        (leave) => leave.status === "Pending"
      ).length;
      const approved = leaves.filter(
        (leave) => leave.status === "Approved"
      ).length;
      const rejected = leaves.filter(
        (leave) => leave.status === "Rejected"
      ).length;
      setStats({
        employees: employees.length,
        pending,
        approved,
        rejected
      });
      setRecentLeaves(leaves.slice(0, 3));
    } catch (error) {
    }
  };
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <ManagerSidebar />
      <div className="flex-1">
        <ManagerNavbar />
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, Manager 👋
            </h1>
            <p className="text-gray-500 mt-2">
              Manage employees and review leave requests.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <Users className="text-blue-700" size={45} />
              <h2 className="text-3xl font-bold mt-4">
                {stats.employees}
              </h2>
              <p className="text-gray-500">
                Employees
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <Clock className="text-yellow-500" size={45} />
              <h2 className="text-3xl font-bold mt-4">
                {stats.pending}
              </h2>
              <p className="text-gray-500">
                Pending Requests
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <CheckCircle className="text-green-600" size={45} />
              <h2 className="text-3xl font-bold mt-4">
                {stats.approved}
              </h2>
              <p className="text-gray-500">
                Approved
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <XCircle className="text-red-600" size={45} />
              <h2 className="text-3xl font-bold mt-4">
                {stats.rejected}
              </h2>
              <p className="text-gray-500">
                Rejected
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md mt-10 overflow-hidden">
            <div className="bg-blue-700 text-white px-6 py-4">
              <h2 className="text-xl font-semibold">
                Recent Leave Requests
              </h2>
            </div>
            <table className="w-full table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-center">
                    Employee
                  </th>
                  <th className="p-4 text-center">
                    Leave Dates
                  </th>
                  <th className="p-4 text-center">
                    Reason
                  </th>
                  <th className="p-4 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.length > 0 ? (
                  recentLeaves.map((leave) => (
                    <tr key={leave.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 text-center">
                        {leave.employee_name || leave.name}
                      </td>
                      <td className="p-4 text-center">
                        {formatDate(leave.start_date)} - {formatDate(leave.end_date)}
                      </td>
                      <td className="p-4 text-center">
                        {leave.reason}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={
                            leave.status === "Approved"
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                              : leave.status === "Rejected"
                              ? "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                              : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                          }
                        >
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No Leave Requests Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;