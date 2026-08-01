import { useEffect, useState } from "react";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import { Search, Pencil, Trash2, X, Users } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getEmployees, updateEmployee, deleteEmployee } from "../../api/userApi";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: "",
    employee_id: "",
    name: "",
    email: "",
    phone: "",
    department: ""
  });
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      console.log(res.data);
      setEmployees(res.data);
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };
  const handleEdit = (employee) => {
    setSelectedEmployee({
      id: employee.id,
      employee_id: employee.employee_id || "",
      name: employee.name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      department: employee.department || ""
    });
    setShowModal(true);
  };
  const handleChange = (e) => {
    setSelectedEmployee({
      ...selectedEmployee,
      [e.target.name]: e.target.value
    });
  };
  const handleUpdate = async () => {
    try {
      await updateEmployee(selectedEmployee.id, {
        employee_id: selectedEmployee.employee_id,
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        phone: selectedEmployee.phone,
        department: selectedEmployee.department
      });
      toast.success("Employee updated successfully");
      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      toast.error("Update failed");
    }
  };
  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Employee?",
      text: "Are you sure you want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true
    });
    if (!result.isConfirmed) return;
    try {
      await deleteEmployee(id);
      await Swal.fire({
        title: "Deleted!",
        text: "Employee deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      fetchEmployees();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete employee.",
        icon: "error"
      });
    }
  };
  const filteredEmployees = employees.filter((employee) => {
    const keyword = search.toLowerCase();
    return (
      employee.employee_id?.toLowerCase().includes(keyword) ||
      employee.name?.toLowerCase().includes(keyword) ||
      employee.email?.toLowerCase().includes(keyword) ||
      employee.department?.toLowerCase().includes(keyword)
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
                Manage Employees
              </h1>
              <p className="mt-2 text-blue-100 text-sm sm:text-base">
                View, update and manage employee information easily.
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-white/20 backdrop-blur-md items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Users size={38} />
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-900 px-5 sm:px-8 py-5 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users size={24} />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">
                    Employee List
                  </h2>
                  <p className="text-sm text-blue-100">
                    Total Employees : {filteredEmployees.length}
                  </p>
                </div>
              </div>
              <div className="relative w-full lg:w-72">
                <Search size={20} className="absolute left-4 top-3 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employee..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white text-gray-700 outline-none shadow-md focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-5 text-left">Employee ID</th>
                    <th className="p-5 text-left">Name</th>
                    <th className="p-5 text-left">Email</th>
                    <th className="p-5 text-left">Department</th>
                    <th className="p-5 text-center">Total Leaves</th>
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredEmployees.length > 0
                      ?
                      filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-blue-50 transition">
                          <td className="p-5">{employee.employee_id}</td>
                          <td className="p-5 font-medium text-slate-800">{employee.name}</td>
                          <td className="p-5 text-gray-600">{employee.email}</td>
                          <td className="p-5">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {employee.department || "Not Assigned"}
                            </span>
                          </td>
                          <td className="p-5 text-center">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {employee.total_leaves || 0}
                            </span>
                          </td>
                          <td className="p-5">
                            <div className="flex justify-center gap-3">
                              <button onClick={() => handleEdit(employee)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2.5 rounded-xl shadow hover:scale-110 transition">
                                <Pencil size={18} />
                              </button>
                              <button onClick={() => handleDelete(employee.id)} className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-xl shadow hover:scale-110 transition">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                      :
                      (
                        <tr>
                          <td colSpan="6" className="text-center py-8 text-gray-500">
                            No Employees Found
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
      {
        showModal &&
        (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Edit Employee
                </h2>
                <button onClick={() => setShowModal(false)} className="hover:bg-gray-100 p-2 rounded-full">
                  <X size={22} />
                </button>
              </div>
              <div className="space-y-4">
                {["employee_id", "name", "email", "phone", "department"].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={selectedEmployee[field]}
                    onChange={handleChange}
                    placeholder={field.replace("_", " ").toUpperCase()}
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
                <button onClick={handleUpdate} className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold">
                  Update Employee
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
export default Employees;