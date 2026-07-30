import { useEffect, useState } from "react";
import ManagerNavbar from "../../components/layout/ManagerNavbar";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import { Search, Pencil, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { getEmployees, updateEmployee, deleteEmployee } from "../../api/userApi";
function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({ id: "", employee_id: "", name: "", email: "", phone: "", department: "" });
  useEffect(() => { fetchEmployees(); }, []);
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
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
    setSelectedEmployee({ ...selectedEmployee, [e.target.name]: e.target.value });
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
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      toast.error("Delete failed");
    }
  };
  const filteredEmployees = employees.filter((employee) => {
    const keyword = search.toLowerCase();
    return employee.employee_id?.toLowerCase().includes(keyword) || employee.name?.toLowerCase().includes(keyword) || employee.email?.toLowerCase().includes(keyword);
  });
  return (
    <div className="flex min-h-screen bg-slate-100">
      <ManagerSidebar />
      <div className="flex-1">
        <ManagerNavbar />
        <div className="p-8">
          <div className="flex justify-between mb-8">
            <h1 className="text-3xl font-bold">Employees</h1>
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Employee" className="pl-10 pr-4 py-2 border rounded-xl" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-4 text-left">Employee ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b">
                    <td className="p-4">{employee.employee_id}</td>
                    <td className="p-4">{employee.name}</td>
                    <td className="p-4">{employee.email}</td>
                    <td className="p-4">{employee.department || "Not Assigned"}</td>
                    <td className="p-4">
                      <button onClick={() => handleEdit(employee)} className="bg-yellow-500 text-white p-2 rounded-lg mr-2"><Pencil size={18} /></button>
                      <button onClick={() => handleDelete(employee.id)} className="bg-red-600 text-white p-2 rounded-lg"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <div className="flex justify-between mb-5">
              <h2 className="text-xl font-bold">Edit Employee</h2>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>
            <div className="space-y-4">
              <input name="employee_id" value={selectedEmployee.employee_id} onChange={handleChange} placeholder="Employee ID" className="w-full border p-3 rounded-lg" />
              <input name="name" value={selectedEmployee.name} onChange={handleChange} placeholder="Name" className="w-full border p-3 rounded-lg" />
              <input name="email" value={selectedEmployee.email} onChange={handleChange} placeholder="Email" className="w-full border p-3 rounded-lg" />
              <input name="phone" value={selectedEmployee.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-3 rounded-lg" />
              <input name="department" value={selectedEmployee.department} onChange={handleChange} placeholder="Department" className="w-full border p-3 rounded-lg" />
              <button onClick={handleUpdate} className="w-full bg-blue-700 text-white p-3 rounded-lg">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Employees;