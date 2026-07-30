import { useEffect, useState } from "react";
import ManagerNavbar from "../../components/layout/ManagerNavbar";
import ManagerSidebar from "../../components/layout/ManagerSidebar";
import { UserCircle, Mail } from "lucide-react";
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
            <div className="flex-1">
                <ManagerNavbar />
                <div className="p-8">
                    <div className="bg-white rounded-2xl shadow-lg max-w-3xl mx-auto overflow-hidden">
                        <div className="bg-blue-700 p-8 text-white text-center">
                            <UserCircle size={90} className="mx-auto mb-4" />
                            <h1 className="text-3xl font-bold">
                                Manager Profile
                            </h1>
                            <p className="mt-2 text-blue-100">
                                Manage your account information
                            </p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block mb-2 font-semibold">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserCircle size={20} className="absolute left-4 top-4 text-gray-400" />
                                    <input
                                        value={profile.name || ""}
                                        readOnly
                                        className="w-full border rounded-xl pl-12 py-3 bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail size={20} className="absolute left-4 top-4 text-gray-400" />
                                    <input
                                        value={profile.email || ""}
                                        readOnly
                                        className="w-full border rounded-xl pl-12 py-3 bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
                                    Account Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-xl p-4 shadow-sm">
                                        <p className="text-sm text-gray-500">
                                            Role
                                        </p>
                                        <p className="font-semibold mt-1">
                                            {profile.role}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 shadow-sm">
                                        <p className="text-sm text-gray-500">
                                            Department
                                        </p>
                                        <p className="font-semibold mt-1">
                                            {profile.department || "Administration"}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 shadow-sm">
                                        <p className="text-sm text-gray-500">
                                            Account Status
                                        </p>
                                        <span className="inline-block mt-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            Active
                                        </span>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 shadow-sm">
                                        <p className="text-sm text-gray-500">
                                            Access Level
                                        </p>
                                        <p className="font-semibold mt-1">
                                            Full Access
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ManagerProfile;