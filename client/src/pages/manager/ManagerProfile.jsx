import { useEffect, useState } from "react";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import {
    UserCircle,
    Mail,
    ShieldCheck,
    Building2,
    CheckCircle,
    LockKeyhole
} from "lucide-react";
import { getProfile } from "../../api/userApi";
import { toast } from "react-toastify";

function ManagerProfile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: "",
        department: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setProfile(res.data);
        } catch (error) {
            toast.error("Failed to load profile");
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100">
            <ManagerSidebar />
            <div className="flex-1 min-w-0">
                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
                                Manager Profile 👤
                            </h1>
                            <p className="mt-2 text-blue-100 text-sm sm:text-base">
                                Manage your account information and access details.
                            </p>
                        </div>
                        <div className="hidden sm:flex w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-white/20 backdrop-blur-md items-center justify-center transition-all duration-300 group-hover:scale-110">
                            <UserCircle size={40} className="lg:w-11 lg:h-11" />
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                            <div className="bg-slate-50 rounded-2xl p-5 border hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300">
                                <label className="block font-semibold text-slate-700 mb-3">
                                    Full Name
                                </label>
                                <div className="flex items-center gap-3">
                                    <UserCircle className="text-blue-600" size={24} />
                                    <p className="font-medium text-slate-800 break-words">
                                        {profile.name || "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-5 border hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300">
                                <label className="block font-semibold text-slate-700 mb-3">
                                    Email Address
                                </label>
                                <div className="flex items-center gap-3">
                                    <Mail className="text-blue-600" size={24} />
                                    <p className="font-medium text-slate-800 break-all">
                                        {profile.email || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-5 sm:p-7 border border-blue-100">
                            <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-6 text-center">
                                Account Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <ShieldCheck className="text-blue-600" size={24} />
                                        <p className="text-sm text-gray-500">
                                            Role
                                        </p>
                                    </div>
                                    <p className="font-bold text-slate-800">
                                        {profile.role || "Manager"}
                                    </p>
                                </div>
                                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Building2 className="text-blue-600" size={24} />
                                        <p className="text-sm text-gray-500">
                                            Department
                                        </p>
                                    </div>
                                    <p className="font-bold text-slate-800 break-words">
                                        {profile.department || "Administration"}
                                    </p>
                                </div>
                                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <CheckCircle className="text-green-600" size={24} />
                                        <p className="text-sm text-gray-500">
                                            Account Status
                                        </p>
                                    </div>
                                    <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-semibold text-sm">
                                        Active
                                    </span>
                                </div>
                                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <LockKeyhole className="text-blue-600" size={24} />
                                        <p className="text-sm text-gray-500">
                                            Access Level
                                        </p>
                                    </div>
                                    <p className="font-bold text-slate-800">
                                        Full Access
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default ManagerProfile;