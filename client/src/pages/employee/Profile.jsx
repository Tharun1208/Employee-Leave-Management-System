import { useEffect, useState } from "react";
import { User, Mail, Phone, Building2, Calendar, BadgeCheck } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { toast } from "react-toastify";
import { getProfile } from "../../api/userApi";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Navbar />
          <div className="flex justify-center items-center h-[80vh] text-lg sm:text-xl font-semibold text-gray-500">
            Loading Profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="group bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl shadow-2xl p-5 sm:p-8 text-white mb-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/40">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    My Profile
                  </h1>
                  <p className="mt-2 sm:mt-3 text-blue-100 text-sm sm:text-lg">
                    View your personal information.
                  </p>
                </div>

                <div className="hidden sm:flex w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 items-center justify-center backdrop-blur-sm transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <User
                    size={42}
                    className="transition-transform duration-500 group-hover:scale-125"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105">
                  <User size={60} className="sm:w-[70px] sm:h-[70px] text-white" />
                </div>

                <div className="text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 break-words">
                    {user.name}
                  </h2>

                  <p className="text-base sm:text-lg text-gray-500 capitalize mt-2">
                    {user.role}
                  </p>

                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 sm:px-5 py-2 rounded-full font-semibold mt-4 text-sm sm:text-base">
                    <BadgeCheck size={18} />
                    {user.employee_id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mt-8 sm:mt-10">

                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="text-blue-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="font-semibold text-slate-800 break-all text-sm sm:text-base">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <Phone className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Phone
                    </p>

                    <p className="font-semibold text-slate-800 text-sm sm:text-base">
                      {user.phone || "Not Added"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                    <Building2 className="text-purple-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Department
                    </p>

                    <p className="font-semibold text-slate-800 text-sm sm:text-base">
                      {user.department || "Not Assigned"}
                    </p>
                  </div>
                </div>                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                    <Calendar className="text-orange-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Date Joined
                    </p>

                    <p className="font-semibold text-slate-800 text-sm sm:text-base">
                      {
                        user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "Not Available"
                      }
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;