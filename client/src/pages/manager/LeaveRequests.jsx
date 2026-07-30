import { useEffect, useState } from "react";
import ManagerNavbar from "../../components/layout/ManagerNavbar";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import { CheckCircle, XCircle, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { getAllLeaves, approveLeave, rejectLeave } from "../../api/leaveApi";
function LeaveRequests() {
  const [requests, setRequests] = useState([]);
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
      toast.error(
        error.response?.data?.message || "Failed to load leave requests"
      );
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
      toast.error(
        error.response?.data?.message || "Action failed"
      );
    }
  };
  return (
    <div className="flex min-h-screen bg-slate-100">
      <ManagerSidebar />
      <div className="flex-1">
        <ManagerNavbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Leave Requests
          </h1>
          <p className="text-gray-500 mb-8">
            Review employee leave requests.
          </p>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-4 text-center">Employee</th>
                  <th className="p-4 text-center">Dates</th>
                  <th className="p-4 text-center">Reason</th>
                  <th className="p-4 text-center">Document</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Remarks</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-center">
                        {request.employee_name || request.name}
                      </td>
                      <td className="p-4 text-center">
                        {formatDate(request.start_date)}
                        <br />
                        {formatDate(request.end_date)}
                      </td>
                      <td className="p-4 text-center max-w-xs break-words">
                        {request.reason}
                      </td>
                      <td className="p-4 text-center">
                        {request.document ? (
                          <a
                            href={`http://localhost:5000/uploads/${request.document}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                          >
                            <FileText size={18}/>
                            View
                          </a>
                        ) : (
                          <span className="text-gray-500">
                            No File
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={
                            request.status === "Approved"
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                              : request.status === "Rejected"
                              ? "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                              : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                          }
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="p-4 text-center break-words">
                        {request.remarks || "-"}
                      </td>
                      <td className="p-4 text-center">
                        {request.status === "Pending" ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openModal(request.id, "Approved")}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                            >
                              <CheckCircle size={18}/>
                              Approve
                            </button>
                            <button
                              onClick={() => openModal(request.id, "Rejected")}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                            >
                              <XCircle size={18}/>
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500">
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-500">
                      No Leave Requests Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[450px] p-6">
            <h2 className="text-2xl font-bold mb-4">
              {actionType} Leave Request
            </h2>
            <textarea
              rows="5"
              value={remarks}
              onChange={(e)=>setRemarks(e.target.value)}
              placeholder="Enter remarks..."
              className="w-full border rounded-xl p-3"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={()=>setShowModal(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={submitAction}
                className={
                  actionType === "Approved"
                    ? "px-5 py-2 rounded-lg bg-green-600 text-white"
                    : "px-5 py-2 rounded-lg bg-red-600 text-white"
                }
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