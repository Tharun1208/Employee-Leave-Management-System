import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { Eye, X } from "lucide-react";
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
    if (status === "Approved")
      return "bg-green-100 text-green-700";

    if (status === "Rejected")
      return "bg-red-100 text-red-700";

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Leave History
          </h1>

          <p className="text-gray-500 mt-2">
            View all your leave requests.
          </p>

          <div className="bg-white rounded-2xl shadow-lg mt-8 overflow-hidden">

            {loading ? (
              <div className="p-10 text-center text-gray-500">
                Loading leave history...
              </div>
            ) : (
              <table className="w-full">

                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="p-4 text-left">Leave Type</th>
                    <th className="p-4 text-left">Start Date</th>
                    <th className="p-4 text-left">End Date</th>
                    <th className="p-4 text-left">Reason</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Remarks</th>
                    <th className="p-4 text-center">View</th>
                  </tr>
                </thead>

                <tbody>
                  {leaveHistory.length > 0 ? (
                    leaveHistory.map((leave) => (
                      <tr
                        key={leave.id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-4">
                          {leave.leave_type}
                        </td>

                        <td className="p-4">
                          {new Date(leave.start_date).toLocaleDateString()}
                        </td>

                        <td className="p-4">
                          {new Date(leave.end_date).toLocaleDateString()}
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

                        <td className="p-4">
                          {leave.status === "Pending"
                            ? "Waiting for approval"
                            : leave.status === "Approved"
                            ? "Approved by Manager"
                            : "Rejected by Manager"}
                        </td>

                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedLeave(leave)}
                            className="text-blue-700 hover:text-blue-900"
                          >
                            <Eye size={22} />
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center p-8 text-gray-500"
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

      {selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white w-[450px] rounded-2xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold text-gray-800">
                Leave Details
              </h2>

              <button
                onClick={() => setSelectedLeave(null)}
                className="text-gray-500 hover:text-red-600"
              >
                <X size={24} />
              </button>

            </div>

            <div className="space-y-4 text-gray-700">

              <p>
                <b>Leave Type:</b> {selectedLeave.leave_type}
              </p>

              <p>
                <b>Start Date:</b>{" "}
                {new Date(selectedLeave.start_date).toLocaleDateString()}
              </p>

              <p>
                <b>End Date:</b>{" "}
                {new Date(selectedLeave.end_date).toLocaleDateString()}
              </p>

              <p>
                <b>Reason:</b> {selectedLeave.reason}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    selectedLeave.status
                  )}`}
                >
                  {selectedLeave.status}
                </span>
              </p>

              <p>
                <b>Manager Remark:</b>{" "}
                {selectedLeave.remarks || "No remarks available"}
              </p>

              <p>
                <b>Applied Date:</b>{" "}
                {new Date(selectedLeave.created_at).toLocaleDateString()}
              </p>

            </div>

            <div className="mt-6 text-right">

              <button
                onClick={() => setSelectedLeave(null)}
                className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default LeaveHistory;