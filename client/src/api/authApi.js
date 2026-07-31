import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-leave-management-system-ug86.onrender.com/api",
});

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};
export const updateEmployee = (id, data) => {
    return API.put(`/employees/${id}`, data);
};

export const deleteEmployee = (id) => {
    return API.delete(`/employees/${id}`);
};
export default API;