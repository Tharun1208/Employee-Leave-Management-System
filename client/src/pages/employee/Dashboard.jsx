import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarPlus,
  ClipboardList,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { getMyLeaves } from "../../api/leaveApi";

function Dashboard() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await getMyLeaves();
      setLeaves(res.data);
    } catch (error) {
      
    }
  };

  const getStatusColor = (status) => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your leave requests quickly and easily.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

            <Link
              to="/employee/apply-leave"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
            >

              <CalendarPlus
                size={55}
                className="text-blue-700"
              />

              <h3 className="text-2xl font-semibold mt-5">
                Apply Leave
              </h3>

              <p className="text-gray-500 mt-2">
                Submit a new leave request with supporting documents.
              </p>

            </Link>

            <Link
              to="/employee/history"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
            >

              <ClipboardList
                size={55}
                className="text-green-600"
              />

              <h3 className="text-2xl font-semibold mt-5">
                Leave History
              </h3>

              <p className="text-gray-500 mt-2">
                View all submitted leave requests and their status.
              </p>

            </Link>

          </div>

          <div className="bg-white rounded-2xl shadow-md mt-10 overflow-hidden">

            <div className="bg-blue-700 text-white px-6 py-4">

              <h3 className="text-xl font-semibold">
                Recent Leave Requests
              </h3>

            </div>

            <table className="w-full">

              <thead>

                <tr className="bg-slate-100">

                  <th className="text-left p-4">
                    Leave Type
                  </th>

                  <th className="text-left p-4">
                    Start Date
                  </th>

                  <th className="text-left p-4">
                    End Date
                  </th>

                  <th className="text-left p-4">
                    Reason
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {leaves.length > 0 ? (
                  leaves.slice(0, 3).map((leave) => (

                    <tr
                      key={leave.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4">
                        {leave.leave_type}
                      </td>

                      <td className="p-4">
                        {new Date(
                          leave.start_date
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {new Date(
                          leave.end_date
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {leave.reason}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                            leave.status
                          )}`}
                        >
                          {leave.status}
                        </span>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center p-6 text-gray-500"
                    >
                      No leave requests found.
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