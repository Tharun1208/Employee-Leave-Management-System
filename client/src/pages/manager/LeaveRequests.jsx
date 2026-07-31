import { useEffect, useState } from "react";
import { CheckCircle, XCircle, FileText, ClipboardList, Search } from "lucide-react";
import { toast } from "react-toastify";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import { getAllLeaves, approveLeave, rejectLeave } from "../../api/leaveApi";

function LeaveRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await getAllLeaves();
      setRequests(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load leave requests");
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

  const openModal = (id, action) => {
    setSelectedId(id);
    setActionType(action);
    setRemarks("");
    setShowModal(true);
  };

  const submitAction = async () => {
    try {
      if (actionType === "Approved") {
        await approveLeave(selectedId, remarks);
        toast.success("Leave Approved");
      } else {
        await rejectLeave(selectedId, remarks);
        toast.success("Leave Rejected");
      }

      setShowModal(false);
      setRemarks("");
      fetchLeaves();

    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const filteredRequests = requests.filter((request) => {
    const keyword = search.toLowerCase();

    return (
      request.employee_name?.toLowerCase().includes(keyword) ||
      request.name?.toLowerCase().includes(keyword) ||
      request.reason?.toLowerCase().includes(keyword) ||
      request.status?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <ManagerSidebar />
      <div className="flex-1 min-w-0">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex items-center justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
                Leave Requests 📋
              </h1>
              <p className="mt-2 text-blue-100 text-sm sm:text-base">
                Review and manage employee leave applications.
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-white/20 backdrop-blur-md items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <ClipboardList size={40} />
            </div>
          </div>
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-900 px-5 sm:px-8 py-5 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <ClipboardList size={25} />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">
                    Employee Leave Applications
                  </h2>
                  <p className="text-sm text-blue-100">
                    Total Requests : {filteredRequests.length}
                  </p>
                </div>
              </div>
              <div className="relative w-full lg:w-80">
                <Search
                  size={20}
                  className="absolute left-4 top-3 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search leave request..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white text-gray-700 outline-none shadow-md focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-4 text-center text-sm">
                      Employee
                    </th>
                    <th className="px-4 py-4 text-center text-sm">
                      Dates
                    </th>
                    <th className="px-4 py-4 text-center text-sm">
                      Reason
                    </th>
                    <th className="px-4 py-4 text-center text-sm">
                      Document
                    </th>
                    <th className="px-4 py-4 text-center text-sm">
                      Status
                    </th>
                    <th className="px-4 py-4 text-center text-sm">
                      Remarks
                    </th>
                    <th className="px-4 py-4 text-center text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b hover:bg-blue-50 transition duration-300"
                      >
                        <td className="px-4 py-4 text-center font-medium text-slate-800">
                          {request.employee_name || request.name}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div>
                            {formatDate(request.start_date)}
                          </div>
                          <div className="text-gray-500 text-sm">
                            to
                          </div>
                          <div>
                            {formatDate(request.end_date)}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center max-w-xs break-words text-gray-700">
                          {request.reason}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {request.document ? (
                            <a
                              href={`https://employee-leave-management-system-ug86.onrender.com/uploads/${request.document}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition hover:scale-105"
                            >
                              <FileText size={18} />
                              View
                            </a>
                          ) : (
                            <span className="text-gray-500">
                              No File
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                              request.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : request.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center max-w-xs break-words text-gray-600">
                          {request.remarks || "-"}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {request.status === "Pending" ? (
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() =>
                                  openModal(request.id, "Approved")
                                }
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md transition hover:scale-105"
                              >
                                <CheckCircle size={18} />
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  openModal(request.id, "Rejected")
                                }
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-md transition hover:scale-105"
                              >
                                <XCircle size={18} />
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-500 font-medium">
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-8 text-center text-gray-500"
                      >
                        No Leave Requests Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
                  </main>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                {actionType} Leave Request
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-600 text-xl"
              >
                ✕
              </button>
            </div>
            <textarea
              rows="5"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks..."
              className="w-full border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 rounded-xl transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={submitAction}
                className={`px-5 py-2.5 rounded-xl text-white font-semibold transition ${
                  actionType === "Approved"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {actionType}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default LeaveRequests;