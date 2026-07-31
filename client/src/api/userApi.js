import axios from "axios";

const API = axios.create({
    baseURL: "https://employee-leave-management-system-ug86.onrender.com/api/users"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// Get logged-in user profile
export const getProfile = () => {
    return API.get("/profile");
};


// Get all employees (Manager)
export const getEmployees = () => {
    return API.get("/employees");
};


// Update employee
export const updateEmployee = (id, data) => {
    return API.put(`/employees/${id}`, data);
};


// Delete employee
export const deleteEmployee = (id) => {
    return API.delete(`/employees/${id}`);
};