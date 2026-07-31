import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const employeeName = user?.name || "Employee";
  const employeeId = user?.employee_id || "EMP001";

  return (
    <header className="bg-gradient-to-r from-white via-blue-50 to-white shadow-lg min-h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-blue-100 gap-4 sticky top-0 z-50">

      <div className="min-w-0">

        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent truncate">
          Employee Leave Management System
        </h1>

        <p className="hidden sm:block text-sm text-gray-500 mt-1">
          Employee Dashboard
        </p>

      </div>


      <button
        onClick={() => navigate("/employee/profile")}
        className="flex items-center gap-3 bg-white px-3 sm:px-5 py-2 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >

        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl uppercase transition-all duration-300 hover:scale-110 hover:rotate-6">
          {employeeName.charAt(0)}
        </div>


        <div className="text-left">

          <h3 className="font-bold text-gray-800 text-sm sm:text-lg truncate max-w-[120px] sm:max-w-[180px]">
            {employeeName}
          </h3>

          <p className="text-xs sm:text-sm text-blue-600 font-semibold">
            ID: {employeeId}
          </p>

        </div>

      </button>

    </header>
  );
}

export default Navbar;