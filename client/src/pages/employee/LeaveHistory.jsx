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
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <div className="p-8">

          {/* Header Card */}
          <div className="group bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-8 shadow-xl text-white mb-8 transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-blue-500/40 cursor-pointer">

            <div className="flex items-center justify-between">

              <div>
                <h1 className="text-4xl font-bold">
                  Leave History
                </h1>

                <p className="mt-2 text-blue-100 text-lg">
                  Track all your leave requests and their current status.
                </p>
              </div>


              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">

                <History
                  size={42}
                  className="transition-transform duration-500 group-hover:scale-125"
                />

              </div>

            </div>

          </div>


          {/* Table */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

            {loading ? (

              <div className="p-12 text-center text-gray-500 text-lg">
                Loading leave history...
              </div>

            ) : (

              <table className="w-full">

                <thead className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

                  <tr>

                    <th className="p-5 text-left font-semibold">
                      Leave Type
                    </th>

                    <th className="p-5 text-left font-semibold">
                      Start Date
                    </th>

                    <th className="p-5 text-left font-semibold">
                      End Date
                    </th>

                    <th className="p-5 text-left font-semibold">
                      Reason
                    </th>

                    <th className="p-5 text-left font-semibold">
                      Status
                    </th>

                    <th className="p-5 text-left font-semibold">
                      Remarks
                    </th>

                    <th className="p-5 text-center font-semibold">
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

                        <td className="p-5 font-medium text-slate-700">
                          {leave.leave_type}
                        </td>


                        <td className="p-5">
                          {new Date(leave.start_date).toLocaleDateString()}
                        </td>


                        <td className="p-5">
                          {new Date(leave.end_date).toLocaleDateString()}
                        </td>


                        <td className="p-5 max-w-xs break-words">
                          {leave.reason}
                        </td>


                        <td className="p-5">

                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(leave.status)}`}>
                            {leave.status}
                          </span>

                        </td>


                        <td className="p-5">

                          {
                            leave.status === "Pending"
                              ? "Waiting for approval"
                              : leave.status === "Approved"
                                ? "Approved by Manager"
                                : "Rejected by Manager"
                          }

                        </td>


                        <td className="p-5 text-center">

                          <button
                            onClick={() => setSelectedLeave(leave)}
                            className="w-11 h-11 rounded-full bg-blue-100 hover:bg-blue-700 hover:text-white flex items-center justify-center mx-auto transition-all duration-300"
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
                        className="text-center py-12 text-gray-500 text-lg"
                      >
                        No leave history found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>



      {/* Modal */}

      {selectedLeave && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">


            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">
                Leave Details
              </h2>


              <button
                onClick={() => setSelectedLeave(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              >

                <X size={24} className="text-white" />

              </button>

            </div>


            <div className="p-8 space-y-5 overflow-y-auto">

              <div className="grid grid-cols-2 gap-5">


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

                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedLeave.status)}`}>
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



                <div className="bg-slate-50 rounded-2xl border p-5 col-span-2">

                  <p className="text-sm text-gray-500 mb-2">
                    Leave Reason
                  </p>

                  <p className="text-slate-700 break-words">
                    {selectedLeave.reason}
                  </p>

                </div>



                <div className="bg-slate-50 rounded-2xl border p-5 col-span-2">

                  <p className="text-sm text-gray-500 mb-2">
                    Manager Remarks
                  </p>

                  <p className="text-slate-700">
                    {selectedLeave.remarks || "No remarks available"}
                  </p>

                </div>



                <div className="bg-slate-50 rounded-2xl border p-5 col-span-2">

                  <p className="text-sm text-gray-500 mb-2">
                    Applied Date
                  </p>

                  <p className="text-slate-700">
                    {new Date(selectedLeave.created_at).toLocaleDateString()}
                  </p>

                </div>


              </div>



              <div className="flex justify-end pt-2">

                <button
                  onClick={() => setSelectedLeave(null)}
                  className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:-translate-y-1 transition-all duration-300"
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