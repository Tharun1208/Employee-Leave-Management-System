import { useEffect, useState } from "react";
import ManagerNavbar from "../../components/layout/ManagerNavbar";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  BriefcaseBusiness
} from "lucide-react";
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

      setStats({
        employees: employees.length,
        pending: leaves.filter(
          leave => leave.status === "Pending"
        ).length,
        approved: leaves.filter(
          leave => leave.status === "Approved"
        ).length,
        rejected: leaves.filter(
          leave => leave.status === "Rejected"
        ).length
      });

      setRecentLeaves(leaves.slice(0, 3));

    } catch (error) {

    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };
  const cards = [
    {
      title: "Employees",
      value: stats.employees,
      icon: Users,
      style: "bg-blue-100 text-blue-700"
    },
    {
      title: "Pending Requests",
      value: stats.pending,
      icon: Clock,
      style: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      style: "bg-green-100 text-green-600"
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      style: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <ManagerSidebar />
      <div className="flex-1 min-w-0">
        <ManagerNavbar />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
                Welcome, Manager 👋
              </h1>
              <p className="mt-2 text-blue-100 text-sm sm:text-base">
                Manage employees and review leave requests efficiently.
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/20 backdrop-blur-md items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <BriefcaseBusiness size={40} className="text-white md:w-12 md:h-12" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 border border-slate-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${card.style}`}>
                    <Icon size={28} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-5">
                    {card.value}
                  </h2>
                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    {card.title}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 sm:mt-10 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white px-5 sm:px-8 py-5">
              <h2 className="text-lg sm:text-xl font-bold">
                Recent Leave Requests
              </h2>
              <p className="text-sm text-blue-100">
                Latest employee applications
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-5 sm:px-6 py-4 text-left text-sm sm:text-base">
                      Employee
                    </th>
                    <th className="px-5 sm:px-6 py-4 text-left text-sm sm:text-base">
                      Leave Dates
                    </th>
                    <th className="px-5 sm:px-6 py-4 text-left text-sm sm:text-base">
                      Reason
                    </th>
                    <th className="px-5 sm:px-6 py-4 text-left text-sm sm:text-base">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    recentLeaves.length > 0
                      ?
                      recentLeaves.map((leave) => (
                        <tr
                          key={leave.id}
                          className="border-b hover:bg-blue-50 transition-all duration-300"
                        >
                          <td className="px-5 sm:px-6 py-4 font-medium text-sm sm:text-base">
                            {leave.employee_name || leave.name}
                          </td>
                          <td className="px-5 sm:px-6 py-4 text-sm sm:text-base">
                            {formatDate(leave.start_date)}
                            {" - "}
                            {formatDate(leave.end_date)}
                          </td>
                          <td className="px-5 sm:px-6 py-4 text-sm sm:text-base">
                            {leave.reason}
                          </td>
                          <td className="px-5 sm:px-6 py-4">
                            <span
                              className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold ${leave.status === "Approved"
                                  ?
                                  "bg-green-100 text-green-700"
                                  :
                                  leave.status === "Rejected"
                                    ?
                                    "bg-red-100 text-red-700"
                                    :
                                    "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                              {leave.status}
                            </span>
                          </td>
                        </tr>
                      ))
                      :
                      (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center py-8 text-gray-500"
                          >
                            No Leave Requests Found
                          </td>
                        </tr>
                      )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;