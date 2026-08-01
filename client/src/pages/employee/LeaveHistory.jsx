import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { Eye, X, History } from "lucide-react";
import { toast } from "react-toastify";
import { getMyLeaves } from "../../api/leaveApi";

function LeaveHistory() {

  const [leaveHistory, setLeaveHistory] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await getMyLeaves();
      setLeaveHistory(res.data);
    } catch (error) {
      toast.error("Failed to load leave history");
    } finally {
      setLoading(false);
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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">

      <Sidebar />

      <div className="flex-1 w-full overflow-hidden">

        <div className="p-4 sm:p-6 lg:p-8">

          {/* Header */}

          <div className="group bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xl text-white mb-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/40">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  Leave History
                </h1>

                <p className="mt-2 text-sm sm:text-base lg:text-lg text-blue-100">
                  Track all your leave requests and their current status.
                </p>

              </div>

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm self-start md:self-auto">

                <History
                  size={38}
                  className="sm:w-11 sm:h-11"
                />

              </div>

            </div>

          </div>

          {/* Table */}

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

            {loading ? (

              <div className="py-20 text-center text-gray-500 text-lg">
                Loading leave history...
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-[900px] w-full">

                  <thead className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

                    <tr>

                      <th className="px-5 py-4 text-left whitespace-nowrap">
                        Leave Type
                      </th>

                      <th className="px-5 py-4 text-left whitespace-nowrap">
                        Start Date
                      </th>

                      <th className="px-5 py-4 text-left whitespace-nowrap">
                        End Date
                      </th>

                      <th className="px-5 py-4 text-left whitespace-nowrap">
                        Reason
                      </th>

                      <th className="px-5 py-4 text-left whitespace-nowrap">
                        Status
                      </th>

                      <th className="px-5 py-4 text-left whitespace-nowrap">
                        Remarks
                      </th>

                      <th className="px-5 py-4 text-center whitespace-nowrap">
                        View
                      </th>

                    </tr>

                  </thead>

                  <tbody>
                    {leaveHistory.length > 0 ? (

                      leaveHistory.map((leave) => (

                        <tr
                          key={leave.id}
                          className="border-b hover:bg-blue-50 transition-all duration-300"
                        >

                          <td className="px-5 py-4 font-medium text-slate-700 whitespace-nowrap">
                            {leave.leave_type}
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            {new Date(leave.start_date).toLocaleDateString()}
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            {new Date(leave.end_date).toLocaleDateString()}
                          </td>

                          <td className="px-5 py-4 max-w-xs break-words">
                            {leave.reason}
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">

                            <span
                              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                leave.status
                              )}`}
                            >
                              {leave.status}
                            </span>

                          </td>

                          <td className="px-5 py-4">

                            {leave.status === "Pending"
                              ? "Waiting for approval"
                              : leave.status === "Approved"
                                ? "Approved by Manager"
                                : "Rejected by Manager"}

                          </td>

                          <td className="px-5 py-4 text-center">

                            <button
                              onClick={() => setSelectedLeave(leave)}
                              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-100 hover:bg-blue-700 hover:text-white flex items-center justify-center mx-auto transition-all duration-300"
                            >

                              <Eye size={20} />

                            </button>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan="7"
                          className="py-16 text-center text-gray-500 text-lg"
                        >
                          No leave history found.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>
      {selectedLeave && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-5 sm:px-8 py-5 flex items-center justify-between">

              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Leave Details
              </h2>

              <button
                onClick={() => setSelectedLeave(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <X size={24} className="text-white" />
              </button>

            </div>

            <div className="p-5 sm:p-8 overflow-y-auto">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="bg-slate-50 rounded-2xl border p-5">

                  <p className="text-sm text-gray-500 mb-2">
                    Leave Type
                  </p>

                  <p className="font-semibold text-slate-800">
                    {selectedLeave.leave_type}
                  </p>

                </div>

                <div className="bg-slate-50 rounded-2xl border p-5">

                  <p className="text-sm text-gray-500 mb-2">
                    Status
                  </p>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      selectedLeave.status
                    )}`}
                  >
                    {selectedLeave.status}
                  </span>

                </div>

                <div className="bg-slate-50 rounded-2xl border p-5">

                  <p className="text-sm text-gray-500 mb-2">
                    Start Date
                  </p>

                  <p className="font-semibold text-slate-800">
                    {new Date(selectedLeave.start_date).toLocaleDateString()}
                  </p>

                </div>

                <div className="bg-slate-50 rounded-2xl border p-5">

                  <p className="text-sm text-gray-500 mb-2">
                    End Date
                  </p>

                  <p className="font-semibold text-slate-800">
                    {new Date(selectedLeave.end_date).toLocaleDateString()}
                  </p>

                </div>

                <div className="bg-slate-50 rounded-2xl border p-5 md:col-span-2">

                  <p className="text-sm text-gray-500 mb-2">
                    Leave Reason
                  </p>

                  <p className="text-slate-700 break-words whitespace-pre-wrap">
                    {selectedLeave.reason}
                  </p>

                </div>

                <div className="bg-slate-50 rounded-2xl border p-5 md:col-span-2">

                  <p className="text-sm text-gray-500 mb-2">
                    Manager Remarks
                  </p>

                  <p className="text-slate-700 break-words">
                    {selectedLeave.remarks || "No remarks available"}
                  </p>

                </div>

                {selectedLeave.document && (

                  <div className="bg-slate-50 rounded-2xl border p-5 md:col-span-2">

                    <p className="text-sm text-gray-500 mb-3">
                      Supporting Document
                    </p>

                  </div>

                )}

                <div className="bg-slate-50 rounded-2xl border p-5 md:col-span-2">

                  <p className="text-sm text-gray-500 mb-2">
                    Applied Date
                  </p>

                  <p className="text-slate-700">
                    {new Date(selectedLeave.created_at).toLocaleDateString()}
                  </p>

                </div>

              </div>

              <div className="flex justify-end mt-8">

                <button
                  onClick={() => setSelectedLeave(null)}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default LeaveHistory;