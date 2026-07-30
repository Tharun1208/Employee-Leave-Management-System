import { useState } from "react";
import { CalendarDays, Upload } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { applyLeave } from "../../api/leaveApi";

function ApplyLeave() {
  const [formData, setFormData] = useState({
    leave_type: "",
    reason: "",
    start_date: "",
    end_date: ""
  });

  const [document, setDocument] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData();

      data.append(
        "leave_type",
        formData.leave_type
      );

      data.append(
        "reason",
        formData.reason
      );

      data.append(
        "start_date",
        formData.start_date
      );

      data.append(
        "end_date",
        formData.end_date
      );

      if(document){
        data.append(
          "document",
          document
        );
      }


      const response = await applyLeave(data);

      

      toast.success(
        "Leave applied successfully!"
      );


      setFormData({
        leave_type:"",
        reason:"",
        start_date:"",
        end_date:""
      });

      setDocument(null);


    } catch(error){

      

      toast.error(
        error.response?.data?.message ||
        "Failed to apply leave"
      );

    }
  };


  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar/>

      <div className="flex-1">

        <Navbar/>

        <div className="p-8">

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

            <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-3">
              <CalendarDays/>
              Apply Leave
            </h1>

            <p className="text-gray-500 mt-2 mb-8">
              Fill in the details below to submit your leave request.
            </p>


            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>
                <label className="block mb-2 font-medium">
                  Leave Type
                </label>

                <select
                  name="leave_type"
                  value={formData.leave_type}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                >

                  <option value="">
                    Select Leave Type
                  </option>

                  <option value="Casual">
                    Casual Leave
                  </option>

                  <option value="Sick">
                    Sick Leave
                  </option>

                  <option value="Earned">
                    Earned Leave
                  </option>

                  <option value="Maternity">
                    Maternity Leave
                  </option>

                  <option value="Paternity">
                    Paternity Leave
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              <div>

                <label className="block mb-2 font-medium">
                  Leave Reason
                </label>

                <textarea
                  name="reason"
                  rows="4"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter leave reason"
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

              </div>


              <div>

                <label className="block mb-2 font-medium">
                  Start Date
                </label>

                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

              </div>


              <div>

                <label className="block mb-2 font-medium">
                  End Date
                </label>

                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />

              </div>


              <div>

                <label className="block mb-2 font-medium">
                  Supporting Document
                </label>

                <div className="flex items-center gap-3 border rounded-xl p-3">

                  <Upload
                    size={22}
                    className="text-blue-700"
                  />

                  <input
                    type="file"
                    onChange={(e)=>setDocument(e.target.files[0])}
                    className="w-full"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />

                </div>

              </div>


              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
              >
                Submit Leave Request
              </button>


            </form>


          </div>

        </div>

      </div>

    </div>
  );
}

export default ApplyLeave;