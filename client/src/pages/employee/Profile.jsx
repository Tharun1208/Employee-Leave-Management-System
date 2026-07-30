import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  BadgeCheck
} from "lucide-react";
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
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-8 text-center text-gray-500">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            View your personal information.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-36 h-36 rounded-full bg-blue-700 flex items-center justify-center text-white">
                <User size={70} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {user?.name}
                </h2>

                <p className="text-gray-500 capitalize">
                  {user?.role}
                </p>

                <p className="mt-2 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                  <BadgeCheck size={18} />
                  {user?.employee_id}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl">
                <Mail className="text-blue-700" />
                <div>
                  <h3 className="font-semibold">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl">
                <Phone className="text-blue-700" />
                <div>
                  <h3 className="font-semibold">
                    Phone
                  </h3>

                  <p className="text-gray-600">
                    {user?.phone || "Not Added"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl">
                <Building2 className="text-blue-700" />
                <div>
                  <h3 className="font-semibold">
                    Department
                  </h3>

                  <p className="text-gray-600">
                    {user?.department || "Not Assigned"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl">
                <Calendar className="text-blue-700" />
                <div>
                  <h3 className="font-semibold">
                    Date Joined
                  </h3>

                  <p className="text-gray-600">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;