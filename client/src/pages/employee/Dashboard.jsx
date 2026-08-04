import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CalendarPlus,
  ClipboardList,
  CalendarCheck,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { getMyLeaves } from "../../api/leaveApi";
import {
  getNotifications,
  markNotificationRead
} from "../../api/notificationApi";

function Dashboard() {

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
    checkNotifications();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await getMyLeaves();
      setLeaves(res.data);
    } catch (error) {

    }
  };
  const checkNotifications = async () => {
    try {
      const res = await getNotifications();

      const unread = res.data.filter(
        notification => notification.is_read === 0
      );

      if (unread.length > 0) {

        const latest = unread[0];

        await Swal.fire({
          title: "Leave Notification",
          text: latest.message,
          icon: latest.message.toLowerCase().includes("approved")
            ? "success"
            : latest.message.toLowerCase().includes("rejected")
              ? "error"
              : "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563eb"
        });

        for (const notification of unread) {
          await markNotificationRead(notification.id);
        }

      }

    } catch (error) {
      console.error(error);
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

  const pending = leaves.filter(
    item => item.status === "Pending"
  ).length;

  const approved = leaves.filter(
    item => item.status === "Approved"
  ).length;

  const rejected = leaves.filter(
    item => item.status === "Rejected"
  ).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">

      <Sidebar />

      <div className="flex-1 min-w-0">

        <Navbar />

        <main className="p-4 sm:p-6 lg:p-8">

          <div className="group bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10 text-white mb-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/40">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

              <div className="text-center sm:text-left">

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">
                  Welcome Back 👋
                </h1>

                <p className="text-blue-100 mt-3 text-sm sm:text-base lg:text-lg">
                  Manage your leave requests quickly and efficiently.
                </p>

              </div>

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">

                <CalendarCheck
                  size={42}
                  className="sm:w-[50px] sm:h-[50px] transition-transform duration-500 group-hover:scale-125"
                />

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">

            <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 hover:-translate-y-2 hover:shadow-blue-200 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 font-medium text-sm sm:text-base">
                    Pending Leaves
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-yellow-600">
                    {pending}
                  </h2>

                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">

                  <Clock
                    size={30}
                    className="text-yellow-600 sm:w-[34px] sm:h-[34px]"
                  />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 hover:-translate-y-2 hover:shadow-green-200 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 font-medium text-sm sm:text-base">
                    Approved
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-green-600">
                    {approved}
                  </h2>

                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                  <CheckCircle
                    size={30}
                    className="text-green-600 sm:w-[34px] sm:h-[34px]"
                  />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 hover:-translate-y-2 hover:shadow-red-200 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 font-medium text-sm sm:text-base">
                    Rejected
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-red-600">
                    {rejected}
                  </h2>

                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-100 flex items-center justify-center">

                  <XCircle
                    size={30}
                    className="text-red-600 sm:w-[34px] sm:h-[34px]"
                  />

                </div>

              </div>

            </div>

          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8">

            <Link
              to="/employee/apply-leave"
              className="group bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-transparent hover:border-blue-300 hover:-translate-y-2 hover:shadow-blue-300 transition-all duration-300"
            >

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-700 transition-all duration-300">

                <CalendarPlus
                  size={36}
                  className="text-blue-700 group-hover:text-white transition-all duration-300 group-hover:rotate-12"
                />

              </div>

              <h2 className="text-xl sm:text-2xl font-bold mt-5 text-slate-800">
                Apply Leave
              </h2>

              <p className="text-gray-500 mt-3 leading-7 text-sm sm:text-base">
                Submit a leave request with all required information and upload supporting documents if necessary.
              </p>

              <div className="mt-5 text-blue-700 font-semibold group-hover:translate-x-2 transition-all duration-300">
                Apply Now →
              </div>

            </Link>


            <Link
              to="/employee/history"
              className="group bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-transparent hover:border-green-300 hover:-translate-y-2 hover:shadow-green-300 transition-all duration-300"
            >

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">

                <ClipboardList
                  size={36}
                  className="text-green-600 group-hover:text-white transition-all duration-300 group-hover:rotate-12"
                />

              </div>

              <h2 className="text-xl sm:text-2xl font-bold mt-5 text-slate-800">
                Leave History
              </h2>

              <p className="text-gray-500 mt-3 leading-7 text-sm sm:text-base">
                Track all your leave requests, approval status and manager remarks from one place.
              </p>

              <div className="mt-5 text-green-700 font-semibold group-hover:translate-x-2 transition-all duration-300">
                View History →
              </div>

            </Link>

          </div>


          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mt-10 border border-slate-200">

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-5 sm:px-8 py-5">

              <h2 className="text-xl sm:text-2xl font-bold">
                Recent Leave Requests
              </h2>

              <p className="text-blue-100 mt-1 text-sm sm:text-base">
                Your latest submitted leave applications
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="p-4 sm:p-5 text-left font-bold">
                      Leave Type
                    </th>

                    <th className="p-4 sm:p-5 text-left font-bold">
                      Start Date
                    </th>

                    <th className="p-4 sm:p-5 text-left font-bold">
                      End Date
                    </th>

                    <th className="p-4 sm:p-5 text-left font-bold">
                      Reason
                    </th>

                    <th className="p-4 sm:p-5 text-left font-bold">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    leaves.length > 0

                      ?

                      leaves.slice(0, 3).map((leave) => (

                        <tr
                          key={leave.id}
                          className="border-b hover:bg-blue-50 transition-all duration-300"
                        >

                          <td className="p-4 sm:p-5">

                            <span className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm">

                              {leave.leave_type}

                            </span>

                          </td>


                          <td className="p-4 sm:p-5 text-gray-700">

                            {new Date(
                              leave.start_date
                            ).toLocaleDateString()}

                          </td>


                          <td className="p-4 sm:p-5 text-gray-700">

                            {new Date(
                              leave.end_date
                            ).toLocaleDateString()}

                          </td>


                          <td className="p-4 sm:p-5 text-gray-700 max-w-sm break-words">

                            {leave.reason}

                          </td>


                          <td className="p-4 sm:p-5">

                            <span
                              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(leave.status)}`}
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
                            colSpan="5"
                            className="py-12"
                          >

                            <div className="flex flex-col items-center text-center px-5">

                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">

                                <ClipboardList
                                  size={35}
                                  className="text-slate-400"
                                />

                              </div>

                              <h3 className="text-lg sm:text-xl font-semibold text-slate-700">
                                No Leave Requests Found
                              </h3>

                              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                                You haven't submitted any leave requests yet.
                              </p>

                              <Link
                                to="/employee/apply-leave"
                                className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                              >
                                Apply Your First Leave
                              </Link>

                            </div>

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