import { useState } from "react";
import {
  CalendarDays,
  Upload,
  FileText,
  Calendar,
  Send
} from "lucide-react";
import { toast } from "react-toastify";

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


  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      const data = new FormData();

      data.append("leave_type",formData.leave_type);
      data.append("reason",formData.reason);
      data.append("start_date",formData.start_date);
      data.append("end_date",formData.end_date);

      if(document){
        data.append("document",document);
      }


      await applyLeave(data);


      toast.success("Leave applied successfully!");


      setFormData({
        leave_type:"",
        reason:"",
        start_date:"",
        end_date:""
      });

      setDocument(null);


    }catch(error){

      toast.error(
        error.response?.data?.message ||
        "Failed to apply leave"
      );

    }

  };



return (

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex">


    {/* Sidebar */}
    <Sidebar />



    {/* Main Content */}

    <div className="flex-1 min-w-0 transition-all duration-300">


      <main className="p-4 sm:p-6 lg:p-8">


        <div className="w-full mx-auto">


          {/* Header Card */}

          <div
          className="
          group
          bg-gradient-to-r
          from-blue-700
          via-indigo-700
          to-blue-800
          rounded-3xl
          shadow-2xl
          p-5 sm:p-8
          text-white
          mb-8
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-blue-500/40
          "
          >

            <div className="flex items-center justify-between gap-4 flex-wrap">


              <div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  Leave Application
                </h2>


                <p className="text-blue-100 mt-2">
                  Apply and manage your leave requests easily
                </p>


              </div>



              <div
              className="
              hidden sm:flex
              w-20 h-20
              rounded-full
              bg-white/20
              items-center
              justify-center
              backdrop-blur-sm
              transition-all
              duration-500
              group-hover:rotate-12
              group-hover:scale-110
              "
              >

                <CalendarDays size={40}/>

              </div>


            </div>


          </div>





          {/* Form Card */}

          <div
          className="
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-slate-200
          overflow-hidden
          "
          >



          <div
          className="
          bg-gradient-to-r
          from-slate-50
          to-blue-50
          px-5 sm:px-8
          py-5 sm:py-6
          border-b
          "
          >

              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Leave Application Form
              </h2>


              <p className="text-gray-500 mt-1">
                Fill all required information before submitting your request.
              </p>


          </div>





          <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-8 space-y-6"
          >





          {/* Leave Type */}

          <div>

          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">

            <FileText size={18}/>
            Leave Type

          </label>



          <select

          name="leave_type"

          value={formData.leave_type}

          onChange={handleChange}

          required

          className="
          w-full
          rounded-2xl
          border-2
          border-slate-200
          px-5
          py-3
          outline-none
          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
          "

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







          {/* Reason */}

          <div>

          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">

          <FileText size={18}/>
          Leave Reason

          </label>



          <textarea

          name="reason"

          rows="5"

          value={formData.reason}

          onChange={handleChange}

          required

          placeholder="Describe your reason for requesting leave..."

          className="
          w-full
          rounded-2xl
          border-2
          border-slate-200
          px-5
          py-3
          resize-none
          outline-none
          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
          "

          />

          </div>








          {/* Dates */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <div>

          <label className="flex gap-2 items-center font-semibold mb-3 text-gray-700">

          <Calendar size={18}/>
          Start Date

          </label>


          <input

          type="date"

          name="start_date"

          value={formData.start_date}

          onChange={handleChange}

          required

          className="
          w-full
          rounded-2xl
          border-2
          border-slate-200
          px-5
          py-3
          "

          />


          </div>





          <div>

          <label className="flex gap-2 items-center font-semibold mb-3 text-gray-700">

          <Calendar size={18}/>
          End Date

          </label>


          <input

          type="date"

          name="end_date"

          value={formData.end_date}

          onChange={handleChange}

          required

          className="
          w-full
          rounded-2xl
          border-2
          border-slate-200
          px-5
          py-3
          "

          />


          </div>


          </div>









          {/* Upload */}


          <div>

          <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700">

          <Upload size={18}/>
          Supporting Document

          </label>



          <label
          className="
          flex
          flex-col
          sm:flex-row
          items-center
          gap-4
          border-2
          border-dashed
          border-blue-300
          rounded-2xl
          p-6
          cursor-pointer
          bg-blue-50
          hover:bg-blue-100
          "
          >


          <div
          className="
          w-14
          h-14
          rounded-full
          bg-blue-600
          text-white
          flex
          items-center
          justify-center
          "
          >

          <Upload size={24}/>

          </div>



          <div className="flex-1">

          <p className="font-semibold text-slate-700">

          {
          document
          ?
          document.name
          :
          "Choose a document to upload"
          }

          </p>


          <p className="text-sm text-gray-500">
            PDF, JPG, JPEG, PNG
          </p>


          </div>



          <input

          type="file"

          accept=".pdf,.jpg,.jpeg,.png"

          onChange={(e)=>setDocument(e.target.files[0])}

          className="hidden"

          />


          </label>


          </div>








          {/* Submit */}

          <button

          type="submit"

          className="
          w-full
          flex
          items-center
          justify-center
          gap-3
          bg-gradient-to-r
          from-blue-700
          to-indigo-700
          text-white
          font-semibold
          py-4
          rounded-2xl
          shadow-lg
          hover:-translate-y-1
          transition-all
          "

          >

          <Send size={22}/>

          Submit Leave Request


          </button>






          </form>


          </div>



        </div>


      </main>


    </div>


</div>


);


}


export default ApplyLeave;